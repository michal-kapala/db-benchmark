import { supabase, railway, render } from "$lib/prisma";
import { Md5 } from 'ts-md5';

// Call POST api/populate to insert 100 user records for each db
export async function POST() {
  let data: { name: string, email: string }[] = [];

  for(var i = 1; i<=1000; i++) {
      data.push({
          name: Md5.hashStr(`${i + Date.now()}`),
          email: Md5.hashStr(`${i + Date.now()}@example.com`) + '@example.com',
      });
  }

  // populate DBs
  await supabase.user.createMany({data});
  await railway.user.createMany({data});
  const renderCreated = await render.user.createMany({data});
  
  // returns the inserted count
  return new Response(JSON.stringify(renderCreated));
}
