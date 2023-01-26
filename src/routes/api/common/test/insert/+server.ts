import { supabase, railway, render } from "$lib/prisma";
import { Md5 } from 'ts-md5';

// Measures single mutation time
export async function GET() {
  // user data to insert
  const data = {
    name: Md5.hashStr(`${Date.now()}`),
    email: Md5.hashStr(`${Date.now()}@test.com`) + '@test.com',
  };

  // Supabase
  const supabaseStart = performance.now();
  await supabase.user.create({data});
  const supabaseEnd = performance.now();
  // railway.app
  await railway.user.create({data});
  const railwayEnd = performance.now();
  // Render
  await render.user.create({data});
  const renderEnd = performance.now();

  // calculate results
  const result = {
    type: "Insert",
    supabaseTime: supabaseEnd - supabaseStart,
    railwayTime: railwayEnd - supabaseEnd,
    renderTime: renderEnd - railwayEnd,
  }

  // save result to Supabase
  await supabase.result.create({ data: result });
  
  // returns the result
  return new Response(JSON.stringify(result));
}
