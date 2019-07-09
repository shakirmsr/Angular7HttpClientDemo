# AngularHttpClientGetDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Setting up a Fake REST API

To work with HttpClient we need a REST API server, you can either use an external API service, create a real Rest API server or create a fake API using json-server. In this example we'll use the last approach because it's less time consuming.

So head over to your terminal and start by installing json-server from npm:

$ npm install -g json-server 

Next define your data in a db.json file as we provided

Next, you can run a REST server using the following command:

$ json-server --watch db.json 




