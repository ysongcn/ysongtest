# [ysongtest]() 
A demo project which using sparkjava+React.js + PgSQL+ ebean.

### Requirement
- [heroku](http://heroku.com) account
- [toolbelt](https://toolbelt.heroku.com/)
- [maven](http://maven.org)
- [nodejs](http://nodejs.com) - for development
- [webpack](https://www.npmjs.com/package/webpack) - for development

### Build the client
`cd src/main/resources/client`

`npm install`

`webpack` 

if your dont have webpack installed, using this command

`npm install -g webpack`

### Build whole server and Deployment

`heroku create ysongtest`

`mvn heroku:deploy`


