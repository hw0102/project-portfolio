import { getErrorMessage } from "@/utils/getErrorMessage";
import { create } from "axios";

const apiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
if (!apiKey) {
  throw new Error("Missing EXPO_PUBLIC_MOVIE_API_KEY");
}

export const axiosInstance = create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  timeout: 5000,
});

export const fetchMoviesById = async ({ query }: { query: string }) => {
  const endpoint = "/search/movie";

  try {
    const response = await axiosInstance.get(endpoint, {
      params: {
        query: encodeURIComponent(query),
      },
    });
    // see https://developer.themoviedb.org/reference/discover-movie
    const data = response.data;
    return data.results;
  } catch (error) {
    throw new Error(`Error: ${getErrorMessage(error)}`);
  }
};

export const fetchAllMovies = async () => {
  const endpoint = "/discover/movie";

  try {
    const response = await axiosInstance.get(endpoint, {
      params: {
        sort_by: "popularity.desc",
      },
    });
    // see https://developer.themoviedb.org/reference/discover-movie
    const data = response.data;
    return data.results;
  } catch (error) {
    throw new Error(`Error: ${getErrorMessage(error)}`);
  }
};
// export const TMDB_CONFIG = {
//   BASE_URL: "",
//   API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
// };

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmI5MjNkZjY0MzQ1Zjc5ZmU0MTMxY2I5ZjM4MjBjNSIsIm5iZiI6MTc4NDY0Njc5My43NCwic3ViIjoiNmE1ZjhjODkwYTNkNDY2YjVlNzJmNjNiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VZDIWvOYf3D_nIQyjh5kO6c4Jsi-vhf7yN6Xo5fPUMM'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err))
