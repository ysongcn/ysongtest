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
 
NOTICE: Use `java -cp "./target/classes:./target/dependency/*"  com.test.ysong.Application` as main command to ensure ebean find the models from class files, if without models jar file set.

if you have a `add-on available` account, you should add a scheduler to prevent the web into idle state -- that cause the java process restart.

Login to heroku dashboard ,add a scheduler add-on for your web Dyno and  set scheduler job to `curl https://your-app.heroku.com/` then set FREQUENCY to Hourly, that's enough.

### API test

#### All avaliabel APIs

|   RESOURCE           |  METHOD |  DESCIPTION             |
|----------------------|---------|-------------------------|
| /api/(v1)/company    |   GET   | Fetch all company data  |
| /api/(v1)/company/:id|   GET   | Get company data by id  |
| /api/(v1)/company    |   POST  | Create new company      |
| /api/(v1)/company    |   PUT   | Modify company          |
| /api/(v1)/company/:id|   DELETE| Remove a company        |
| /api/(v1)/owner      |   POST  | Add a owner             |
| /api/(v1)/owner/:id  |   DELETE| Remove a owner          |

#### Test using curl:

*get all companys*

`curl -X GET -H "Content-Type: application/json" https://ysongtest.herokuapp.com/api/v1/company`


*get one company detail*

`curl -X GET -H "Content-Type: application/json" https://ysongtest.herokuapp.com/api/v1/company/1`

*create a owner*

`curl -X POST -H "Content-Type: application/json" -d '{ "name":"ysong" }' https://ysongtest.herokuapp.com/api/v1/owner`


*remove a owner*

`curl -X DELETE -H "Content-Type: application/json" https://ysongtest.herokuapp.com/api/v1/owner/1`


*create a company*

`curl -X POST -H "Content-Type: application/json" 
  -d '{	address: "test address",
	city: "test city",
	country: "test country",
	email: "test@some.com",
	name: "test company",
	owner: "ysong,1;andy,2;",
	phone: "13300000000"}' https://ysongtest.herokuapp.com/api/v1/company`
  
  
  
*remove a company*

`curl -X DELETE -H "Content-Type: application/json" https://ysongtest.herokuapp.com/api/v1/company/1`


*update a company*

`curl -X PUT -H "Content-Type: application/json" 
  -d '{	id:"1",
        address: "test address",
	city: "test city",
	country: "test country",
	email: "test@some.com",
	name: "test company",
	owner: "ysong,1;andy,2;",
	phone: "13300000000"}' https://ysongtest.herokuapp.com/api/v1/company`
