# 7-timer-notifications — Docker

> Build from the **project root** (`package.json` lives there), not from this folder.
> Notifications won't show in a headless container — run on the host to see the banner.

```bash
# build (from project root)
docker build -f 7-timer-notifications/Dockerfile -t purple-timer .

# run (default 5s, or pass your own)
docker run --rm purple-timer
docker run --rm purple-timer 1m

# rebuild after code changes: run build again, then run

# stop a running container
docker stop <id_or_name>     # or Ctrl+C if in foreground

# remove
docker rm <id_or_name>       # stopped container (if run without --rm)
docker rmi purple-timer      # the image
```
