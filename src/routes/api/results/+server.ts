import { supabase } from "$lib/prisma";

// returns all samples (results)
export async function GET() {
  const results = await supabase.result.findMany();
  return new Response(JSON.stringify(results));
}
