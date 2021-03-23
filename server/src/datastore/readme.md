### fileDatastore
Operations related to managing json files as datastores.

### data
Results of the cron job to get the latest foia requests will write to this folder, keeping a versioned history. The cron job runs every hour by getting the Foia Requests from muckrock and enriching them with metadata. The latest instance of this data is used to drive the api response. 

This data is not kept in version control as the foia requests are getting updated over time. This means that it'll go stale relatively quickly. 

### jurisdictionData
The jurisdiction metadata that is used to enrich foia requests. Consists of the root New York and New York City jurisdictions and all of their children jurisdictions. This seems to effectively cover all jurisdictions in New York.

Kept in version control in git and updated manually with the `metadata:init` command. This will call against muckrock to paginate against the relevant jurisdictions by the root jursidictions.

### agencyData
The agency metadata that is used to enrich foia requests. Consists of all agencies within New York jurisdictions.

Kept in version control in git and updated manually with the `metadata:init` command. This will call against muckrock to paginate against all agencies and filter out only the agencies that were retrieved from the earlier jurisdiction pull.

### referenceData
Results of the Data in directory is kept for future reference only. The code doesn't interact with this directory.
Previous versions of this reference data are accessible in the git history of this folder. 

- `1614051407854`: The datastore on February 22, 2021
- `1616541037709`: The datastore on March 23, 2021