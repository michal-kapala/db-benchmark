# Overview
Database operation execution time benchmark for managed PostgreSQL database hosting providers.

# DB providers
The app provides support for but not limited to:
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

The support can be extended to any hosting service with support for Prisma's [`postgresql`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#datasource) datasource provider.
Note that e.g. [CockroachDB](https://www.cockroachlabs.com) has its own `cockroachdb` datasource provider and its PostgreSQL instance is not compatible with `postgresql` connector. Refer to [Prisma data source](https://www.prisma.io/docs/concepts/components/prisma-schema/data-sources) docs for details.

Prisma used to support multiple types of data source providers, but the feature is [long deprecated](https://github.com/prisma/prisma/issues/3834) by now, hence it's not possible to connect to different types of databases at once.

# Tech
The benchmark is a TS SvelteKit app bootstrapped with [`try-prisma`](https://www.prisma.io/blog/try-prisma-announcment-Kv6bwRcdjd) built with:
- [Prisma.io](https://www.prisma.io/)
- [Chart.js](https://www.chartjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

# Development

## Deployment

To deploy this benchmark to test your database connections, use the Deploy button to deploy to [Vercel](https://vercel.com).

You will need to provide Postgres connection strings to your Supabase, Railway and Render databases.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmichal-kapala%2Fdb-benchmark&env=SUPABASE_DB_URL,RAILWAY_DB_URL,RENDER_DB_URL&envDescription=Standard%20PostgreSQL%20connection%20strings%20for%20Supabase%2C%20Railway.app%20and%20Render.com%20instances.)

## Local development

To configure the project for local development:
1. Install the dependencies
```
npm install
```
2. Synchronize Prisma schema with your database projects (for each tested database project)
- set the environment variable for `provider` in [schema.prisma](https://github.com/michal-kapala/db-benchmark/blob/master/prisma/schema.prisma#L6)'s datasource
- synchronize the database structure with the hosted instance
```
npx prisma db push
```
3. Run the application:
```
npm run dev
```
