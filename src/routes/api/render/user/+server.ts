import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { render } from "$lib/prisma";

// returns all users
export const GET: RequestHandler = async ({ request }) =>  {

  const users = await render.user.findMany();
  return json(users);
}

// deletes all users
export const DELETE: RequestHandler = async ({ request }) =>  {
  const deleted = await render.user.deleteMany();
  return json(deleted);
}
