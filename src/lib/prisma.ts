import { PrismaClient } from '@prisma/client';

// base client with configured datasource
export const supabase = new PrismaClient();

export const railway = new PrismaClient({
  datasources: {
    db: {
      url: process.env.RAILWAY_DB_URL,
    },
  },
});

export const render = new PrismaClient({
  datasources: {
    db: {
      url: process.env.RENDER_DB_URL,
    },
  },
});
