
# VueJS Datagrid

This project aims to give a simple idea of how to implement a "table with powers" (datagrid/datatable).

Datagrid supports editable fields, sort columns and data search in multiple columns.

As it is my first experience with the VueJS framework, I started with a feature that is usual to every developer: the authentication. I chose to start this way so I could get more comfortable with the framework, and then go to the real deal.

*To do the authentication, you can use any credentials*


## Demo
If you do not want to install and run it locally, you can access the demo [here](https://prsevero-datagrid.herokuapp.com).


## Running it locally...
### In Development mode
#### With NPM
    npm install
    npm start

#### With Yarn
    yarn install
    yarn start

---
### In Production mode
#### With NPM
    npm install
    npm run build
    npm run server

#### With Yarn
    yarn install
    yarn build
    yarn server

---
## Running the tests
#### With NPM
    npm run test:unit

#### With Yarn
    yarn test:unit
* *You must have the dependencies installed before running the tests.*


## Deployment
It is hosted in Heroku, with a git push and deploy approach.


## Misc
I spent about 25 hours in the project until now, counting since reading the VueJS docs, the creation of the project, coding the components and deploying it to the server.

The next steps could be improve the tests and it's coverage and make the component more flexibe, so it can be used in different cases, like supporting other types of data than CSV and have some predefined filters, and in the future have the possibility of it be more user customizable.

Also, in this project I was able to use the CSS *sticky* position property, which helped me to do the table headers fixed to the top even when scrolling the page.
