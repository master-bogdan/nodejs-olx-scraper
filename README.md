# :space_invader: OLX add scraper
Simple NodeJS (Express) scrapper with cron task and saving function to database  

## API request map
```
GET /api/all - return all scraped adds in JSON
GET /api/:id - return scraped add by OLX id-data in JSON
```

## Returned data
```
object: {
  _id: Number,
  link: String,
  title: String,
  location: String,
  date: String,
  price: String,
}
```

### Used technologies
- Express JS
- nodemon
- mongoose
- axios
- node-cron
- cheerio
- cors  
 

## How to test it local
Clone repository with command  
`git clone https://github.com/master-bogdan/nodejs-olx-scraper.git`  
Go to directory with `cd nodejs-olx-scraper/`  
Then `npm install`  
Run `npm run dev`  


## Available Scripts
In the project directory, you can run:

`npm run start`
This just start NodeJS server

`npm run dev`
Runs server in the development mode.  
http://localhost:3001 - for API backend  
