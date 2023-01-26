import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const results = await supabase.result.findMany();
  return { results };
};
