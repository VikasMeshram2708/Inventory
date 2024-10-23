# Inventory App

## Initialization

##### Pre-requisite

- Make sure you have nodejs, git,and docker installed.

```
git clone git@github.com:VikasMeshram2708/Inventory.git
cd Inventory
cp .env.sample .env [NOTE : add you postgres url on databaseUrl and also add a secret key for authentication.]
npm install
docker compose up
npm run dev
open browser and goto the link shown in the terminal/command prompt default is [http://localhost:3000]
sign up properly
login properly using valid credentials
```

### USAGE

- Sign Up with and Login with proper credentials.
- After Login you will be redirected to home page where you can see the Search Bar and Add Product Button
  hit the Add Product Button and fill the form and it will immediately show your added product inside the product table.

### TODO

- [] Add Pagination
  - [] Keep track of pages.

- [] Delete API for single and multiple selected products.

- [x] Use Redux Toolkit and RTK Query for query and mutations.


## BUGS Fixes

- [x] Not redirecting properly on successful login.

## STRETCH

- [] Add export file to .csv functionality.


## BUILD

- [] Comment out all the logs.

- [] npm run build

- [] npm run start

- [] Deploy!!!