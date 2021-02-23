# Muckrock 50-a FOIL request status

This readme is still really rough. Let's improve it together ☆

## 3-step Quick start

### 1. One-time datastore setup

```shell
cd server
npm i
npm run datastore:init:quick
```

### 2. Server setup

```shell
cd server
npm i # If you didn't already do this when setting up the datastore
npm run dev
```

Serves on port `3000`.

Try it by sending a GET request to `localhost:3000/v1/latest`.

### 3. Browser app setup

```shell
cd browser
npm i
npm start # When prompted about ports, enter "Yes".
```

Serves on port `3001`.

Try it by navigating your browser to `localhost:3001`.

## Server notes

### Npm scripts

To run one of these scripts, prepend `npm run` before the script name (e.g., `npm run dev`).

**Server**

- "start": For starting the server in production.
- "dev": **For most development purposes, you should run this script.** It allows localhost in CORS checks and runs the datastore update more frequently than prod (30 min vs 1 hour intervals).
- "dev:lowdata": If you're working on scripts related to cron or datastore updates, you might want to run this script for faster feedback loops, with the tradeoff of less data to work with. Same as "dev", but will run cron every 2 minutes and only update/output 3 records.
- "dev:nocron": If you already have a complete datastore locally and you don't want the cron job running, you can use this script.

**Datastore**

- "datastore:init": Bootstraps a full datastore and exits. **Time: ~15 minutes.**
- "datastore:init:lowdata": Bootstraps your datastore with minimal data (same limits as the "dev:lowdata" script) and exits. **Time: ~3 minutes.**
- "datastore:init:quick": Bootstraps a full datastore with (older) reference data from the repo and exits. **Time: instant.**

**Tests**

- "test": Runs tests.

## Datastore notes

Output is written to `server/src/datastore/data`. This data is not tracked in version control.

Reference data is provided in `server/src/datastore/referenceData/`. This data is not used in the application but is instead provided as a reference for the developer. See [reference data readme](server/src/datastore/referenceData/readme.md) for notes on the files contained within.
