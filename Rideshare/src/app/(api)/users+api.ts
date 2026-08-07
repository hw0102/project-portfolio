// Works in Node.js, Next.js, serverless, and edge runtimes
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const db_url = process.env.DATABASE_URL;

if (!db_url) {
  throw new Error("Add your DATABASE_URL to .env");
}

const sql = neon(db_url);

export const POST = async (request: Request) => {
  const User = z.object({
    name: z.string(),
    email: z.string(),
    clerkId: z.string(),
  });

  const result = User.safeParse(await request.json());

  if (!result.success) {
    return Response.json(
      { error: z.treeifyError(result.error) },
      { status: 400 },
    );
  }
  const { name, email, clerkId } = result.data;

  // access db and add user if not found - need to prevent duplicate
  try {
    const data = await sql`
      INSERT INTO users (
          name,
          email,
          clerk_Id
      ) VALUES (
          ${name},
          ${email},
          ${clerkId}
      )
      RETURNING *
      `;

    return Response.json({ success: true, data: data[0] }, { status: 201 });
  } catch (e) {
    console.error("Failed to create user", e);
    return Response.json({ error: "Something Went Wrong" }, { status: 500 });
  }
};
