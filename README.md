# auth-api


## Author: Rami Zregat


## Project: Access Control


## Lab 8


**Description of today lab:**   
 In this lab, we will implement Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.


## Links to check:


- Heroku application for main branch: https://ramizregat-auth-server.herokuapp.com/

- Github actions link: https://github.com/RamiZregat/auth-api/actions

- Github pull request link: https://github.com/RamiZregat/auth-api/pull/2


## Dependencies:  

- morgan
- method-override
- jsonwebtoken
- eslint
- cors
- bcrypt
- base-64
- dotenv
- express
- jest
- supertest
- pg
- sequelize
- sequelize-cli
- sqlite3

## How to start the server:  
- pgstart
- npm start


## What should I run on the terminal or postman?  
- npm run test / on the terminal
- POST - http://localhost:3030/signup
- POST - http://localhost:3030/signin
- POST - http://localhost:3030/api/v1/food
- GET - http://localhost:3030/api/v1/food
- GET - http://localhost:3030/api/v1/food/1
- PUT - http://localhost:3030/api/v1/food/1
- DELETE - http://localhost:3030/api/v1/food/1
- POST - http://localhost:3030/api/v1/clothes
- GET - http://localhost:3030/api/v1/clothes
- GET - http://localhost:3030/api/v1/clothes/1
- PUT - http://localhost:3030/api/v1/clothes/1
- DELETE - http://localhost:3030/api/v1/clothes/1
- POST - http://localhost:3030/api/v2/food
- GET - http://localhost:3030/api/v2/food
- GET - http://localhost:3030/api/v2/food/1
- PUT - http://localhost:3030/api/v2/food/1
- DELETE - http://localhost:3030/api/v2/food/1
- POST - http://localhost:3030/api/v2/clothes
- GET - http://localhost:3030/api/v2/clothes
- GET - http://localhost:3030/api/v2/clothes/1
- PUT - http://localhost:3030/api/v2/clothes/1
- DELETE - http://localhost:3030/api/v2/clothes/1

## UML

![](./UML-image/UML8.png)