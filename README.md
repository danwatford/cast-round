# Cast Round

## Local Development Infrastructure

The local database stack used by the devcontainer lives at:

- `infra/localdev/docker-compose.yml`

Start supporting infrastructure (MariaDB + phpMyAdmin):

```bash
docker compose -f infra/localdev/docker-compose.yml up -d
```

Stop infrastructure:

```bash
docker compose -f infra/localdev/docker-compose.yml down
```

Reset local database data:

```bash
docker compose -f infra/localdev/docker-compose.yml down -v
```

Service endpoints:

- MariaDB: `host.docker.internal:3306` (matches `api/.env.dev`)
- phpMyAdmin: `http://localhost:8080`

phpMyAdmin login:

- Username: `root`
- Password: `crdevpassword`
- Server selection is preconfigured by compose (`PMA_HOST=db`).

Run dev DB migrations after the database is up:

```bash
cd api
npm run devDbMigrate
```

Migration prerequisites:

- `npm run devDbMigrate` validates the full API environment, not just DB variables.
- Ensure these variables are set (for example in `api/.env.dev` or your shell):
  - `ADMIN_MW_LABEL_ID`
  - `MW_OAUTH2_CLIENT_ID`
  - `MW_OAUTH2_CLIENT_SECRET`
