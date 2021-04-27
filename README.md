# govtech-spaceout

## Developer Info
 - Alex Peh (ahpeh@hotmail.com)
 
## Requirements
- npm
- mongodb

## Install
- Run npm install to download dependencies
- Install mongodb

## Run
- npm start
- npm test

## Routes
 There are 3 routes configured:
 
   GET /facilities: to get out facilitiy information
   
	localhost:3000/facilities/?page=1&limit=10&sort=name&order=asc&filter={"name": "100", "road_name": "AN"}
	localhost:3000/facilities/?page=1&limit=10&sort=name&order=desc

  GET /crowdLevels: to get out facility and its crowd information
    
	localhost:3000/crowdLevels/?start=2020-11-03T00:00:00.000Z&end=2021-12-31T23:59:00.000Z
  
  GET /login: simulate login to get a jwt token. (Default admin user created in mongo db)
  
	localhost:3000/login/?name=admin&password=somepassword
  
 All routes except for /login require api token to be present over the request header under the bearer auth field.

## Assumptions made
- Crowd level has 4 fields:
  - id, band, createdAt, trend
  - Assumed id field belongs to the id of the facility
- Data fetch from the spaceout may contain duplicated records
- Data fetch from both facilities and crowd levels may not be correctly matched
