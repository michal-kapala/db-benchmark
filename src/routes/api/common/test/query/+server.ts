import { supabase, railway, render } from "$lib/prisma";

// Measures full table query times
export async function GET() {
  const supabaseStart = performance.now();
  await supabase.user.findMany();
  const supabaseEnd = performance.now();
  await railway.user.findMany();
  const railwayEnd = performance.now();
  await render.user.findMany();
  const renderEnd = performance.now();

  // calculate results
  const result = {
    type: "Query",
    supabaseTime: supabaseEnd - supabaseStart,
    railwayTime: railwayEnd - supabaseEnd,
    renderTime: renderEnd - railwayEnd,
  }

  // save result to Supabase
  await supabase.result.create({ data: result });
  
  // returns the inserted count
  return new Response(JSON.stringify(result));
}
