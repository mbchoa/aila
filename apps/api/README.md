# API

## Scripts

Some helper scripts to seed our databases.

*  Import restaurants via .csv file:
    ```bash
     mongoimport --uri mongodb+srv://<USERNAME>:<PASSWORD>@<MONGODB_URL> --collection restaurants --type csv --file restaurants.csv --headerline
    ```
