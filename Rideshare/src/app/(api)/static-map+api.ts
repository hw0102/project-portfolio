const apiKey = process.env.MAP_API_KEY;

if (!apiKey) {
  throw new Error("Add your MAP_API_KEY to .env");
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");

  if (!lon || !lat) {
    return Response.json(
      { error: "Missing required query params: lon, lat" },
      { status: 400 },
    );
  }

  const geoapifyUrl = new URL("https://maps.geoapify.com/v1/staticmap");
  geoapifyUrl.searchParams.set("style", "osm-bright");
  geoapifyUrl.searchParams.set("width", "600");
  geoapifyUrl.searchParams.set("height", "400");
  geoapifyUrl.searchParams.set("center", `lonlat:${lon},${lat}`);
  geoapifyUrl.searchParams.set("zoom", "14");
  geoapifyUrl.searchParams.set("apiKey", apiKey);

  const response = await fetch(geoapifyUrl);

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "image/png",
    },
  });
};
