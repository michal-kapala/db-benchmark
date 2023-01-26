import { supabase, railway, render } from "$lib/prisma";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { name, email } = await request.json();
  // Supabase
  const supabaseUser = await supabase.user.create({
    data: {
      name,
      email,
    },
  });

  // railway.app
  const railwayUser = await railway.user.create({
    data: {
      name,
      email,
    },
  });

  // Render
  const renderUser = await render.user.create({
    data: {
      name,
      email,
    },
  });

  return json(renderUser);
};
