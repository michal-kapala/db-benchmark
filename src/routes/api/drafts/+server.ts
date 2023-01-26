import { supabase } from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function GET() {
  const drafts = await supabase.post.findMany({
    where: { published: false },
    include: { author: true },
  })

  return json(drafts)
}
