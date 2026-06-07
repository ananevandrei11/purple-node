# weather-cli

CLI for getting the weather.

## Local

```bash
npm install
node weather.js -h
```

## Docker

The container is started once and **stays alive** — you run commands and inspect files inside it. The code is mounted via a volume, and dependencies are reinstalled into the container on every start, so the running container always matches your `package.json`.

### Start

```bash
docker compose up -d --build
```

After this, the `weather-cli` container will be green (**Running**) in Docker Desktop, with working **Terminal** and **Files** tabs.

### Run commands

From a regular terminal — into the running container:

```bash
docker compose exec weather node weather.js -h
docker compose exec weather node weather.js -t mytoken
docker compose exec weather node weather.js -s Moscow
```

Or get inside with a shell:

```bash
docker compose exec weather sh
# inside:
node weather.js -h
```

### Where the data file lives

`HOME=/app`, so `weather-data.json` is saved **in the project root** — visible both in the editor on the host and in Docker Desktop → **Files** tab → `app/weather-data.json`.

### Restart

When you change **`package.json`** (add/remove dependencies), recreate the container so deps reinstall:

```bash
docker compose up -d --force-recreate
```

You **don't** need this for editing code — it's mounted, just rerun the command.

Rebuild the image only if you change the **`Dockerfile`** itself:

```bash
docker compose up -d --build
```

### Stop

```bash
# stop, keep the container
docker compose stop

# stop and remove the container
docker compose down
```

## Arguments

| Flag          | Description         |
| ------------- | ------------------- |
| no flags      | show weather        |
| `-s [CITY]`   | set the city        |
| `-t [TOKEN]`  | save the API token  |
| `-h`          | help                |
