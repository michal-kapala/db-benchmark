import { supabase } from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function GET() {
  const feed = await supabase.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  return json(feed)
}
