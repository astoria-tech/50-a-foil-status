# Scraper

## Usage

### Creating your first datastore

If you need to get data for the first time, these are the scripts for you:

```
npm run datastore:init            # Run time: 22+ minutes; full dataset (424 records)
npm run datastore:init:debug      # Run time: < 1 minute; small dataset (3 records)
```

Debug mode will show browser UI in case you need to debug the scraper.

### Updating an existing datastore

If you already have a datastore, the update script will copy the existing data, update any FOIA requests that have changed, and write a new copy of the JSON data. The previous datastore will remain untouched.

```
npm run datastore:update            # Run time: 7+ minutes; full dataset (424 records)
npm run datastore:update:debug      # Run time: < 1 minute; small dataset (3 records)
```

The current intention is that `npm run datastore:update` runs as a cron job every N hours, but this plan isn't fully fleshed out yet.

### Getting output

Output is written to `../datastore`.
