# Muckrock 50-a FOIL request status

This readme is still really rough. Let's improve it together ☆

## Datastore setup

**Official way (22+ minute wait time)**

```shell
cd scripts
npm i
npm run datastore:init
```

See the readme in [the `scripts` directory](./scripts/readme.md) for details on what the datastore scripts do.

**Cheating**

Ok, so you don't want to wait that long! You can do this instead:

```shell
mkdir datastore
cp scripts/referenceData/fullDatastore-NNNNNNNNNNNN.json ./datastore/NNNNNNNNNNNN.json # The file rename is important
```

This mimicks what the `npm run datastore:init` script will do, but with reference data already stored within the repo.

## Server setup

```shell
cd server
npm i
npm run dev
```

Serves on port `3000`.

Try it by sending a GET request to `localhost:3000/v1/`

## Browser app setup

```shell
cd browser
npm i
npm start
```

When prompted about ports, enter "Yes".

Serves on port `3001`.

Try it by navigating your browser to `localhost:3001`.
