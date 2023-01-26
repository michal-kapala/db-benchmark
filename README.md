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
