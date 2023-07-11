# CRUD - CSV database

This repository  has designed with extensbility in mind.The  Backend is designed using expressjs and the test cases has been written with jest and supertest. The frontend is designed with Reactjs. Everything has been coded with type script
## Features

- Easy model/schema architecture to  work csv file as database. The database wrapper is  similar to mongoose in functionalities.
- Parallel read/write operation possible beacuse of write lock.
- CRUD operation on the user model using rest apis



## Installation of Backend dependencies

Has only been tested in nodejs v 18.12.1. You would need to install nodejs on your system from the link  https://nodejs.org/en/download
After installing nodejs cd into root dir of the backend folder
```sh
cd backend
```
Install all dependency with the following command
```nodejs
npm install
```

## Installation of Frontend dependencies

cd to root dir of fronend folder
```sh
cd frontend\crud\
```
Install all dependency with the following command
```nodejs
npm install
```

## How to run
To run the project you have first run the backend server
Run it using the prod command
```nodejs
npm run prod
```
This will start the server up and running for incoming api requests

To run the front end 
Run it using the prod command

```nodejs
npm start
```
> Note: Alternatively you can build the file and serve with the following commands

```nodejs
npm run build
npm install -g serve
serve -s build
```
> Note: front end will be running on port 5000 and the backend on 3000

## Unit Test
To Test the backend simply run this command . This will run all the test cases written for the backednd
```nodejs
npm t
```
> Note: Jest and supertest are dev dependencies.if they are not installed plz use the following command 

```nodejs
npm i --also=dev
```

## Database Extensibility
You can extend the core Database Wrapper to create your own model/schema.
> Note: You have to first initialize the database using the following command

```typescript
import { DBConnect } from './database';
DBConnect.connect("local") //location of database.Can be anything of your choice
```

To create a schema you have to extend the abstract class Model
```typescript
import { Models, DocumentAttr, ModelsAttr, Schema } from "../database"


export interface UserDoc extends DocumentAttr {
    email: string,
    lastname: string,
    firstname: string,
    isAdult: Boolean,
    age: Number
}
export interface UserModel extends ModelsAttr {
    email: string,
    lastname: string,
    firstname: string,
    isAdult: Boolean,
    age: Number
}

const userSchema = new Schema(
    {
        email: {
            type: String
        },
        lastname: {
            type: String
        },
        firstname: {
            type: String
        },
        age: {
            type: Number
        },
        isAdult: {
            type: Boolean
        }
    }
)

export class User extends Models<UserDoc, UserModel>{
    constructor(data?: UserModel) {
        super("user", userSchema, data)
    }
}
```
> Note: each table should have their own name sent to parent constructor 

```typescript
super("user", userSchema, data)
```
The first  parameter is the name of the table and also the file that stores the data

> Note: Currently only supports boolean , string and number

The scehma processes the document fields into appropriate type when fetched.

## Database Functionalities
The model created can be used to fetch,write update data-models.

### Save
Data can be saved to table using the following code.
```typescript
const userModel:UserModel={
    email,firstname,lastname,age,isAdult
}
const user = await new User(userModel).save()
```
> Note: On saving the model generates and add _id and timestamps for createdAt and updatedAt to the row

### FindAll
You can get all rows of the table using the following 
```typescript
new User().findAll().then(userlist=>{
    console.log(userlist)
}).catch(e=>{
})
```

### FindByID
You can fetch one row with their _id. If no row matches the _id it returns null
```typescript
new User().findByID(id).then(user=>{
    console.log(user)
}).catch(e=>{
})
```
### Find
You can find all row that matches the desired field. If no row matches the _id it returns and empty array
```typescript
new User().find({email:"test@gmail.com"}).then(userlist=>{
    console.log(userlist)
}).catch(e=>{
})
```


### FindOne
This works similar to find() but it will only return one row that matches the field first.If not field matches it returns null
```typescript
new User().findOne({email:"test@gmail.com"}).then(user=>{
    console.log(user)
}).catch(e=>{
})
```
> Note: findOne() and find() only works on one field.

### FindByIDAndUpdate
This findByIDAndUpdate() finds a row by its _id, then updates everything with new values. It returns an document of the updated row if _id matches otherwise returns null
```typescript
new User().findByIDAndUpdate(id, userdoc).then(user=>{
    console.log(user)
}).catch(e=>{
})
```
> Note: userdoc is User object with all the details

### DeletedByID
This deletedByID() deletes a row that matches the _id.  It returns an document of the deleted row if _id matches otherwise returns null

```typescript
new User().deletedByID(id).then(user=>{
    console.log(user)
}).catch(e=>{
})
```


> Note: Every database query returns a promise to resolve

## Extra

- The wrapper can handle concurrent request to the database using a write lock on the file
- The wrapper creates a separate csv file for each table


## License

MIT


