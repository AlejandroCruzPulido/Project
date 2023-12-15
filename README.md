# Impresioname
This project is intended to make a website for selling glasses

# Relation of the tables:
Tabla users:
The users table is to store the users that people will be created to access the application.

Tabla directions:
The address table stores the addresses of the users, it is made so that 1 user can have more than 1 address but 1 address can only have 1 user.

Tabla buys:
The purchases table stores the purchases made by the user, given that 1 user can make several purchases but 1 purchase can only be made by 1 user.

Tabla glasses:
The glasses table stores the glasses that exist in the application, which are the products that are sold.

Tabla contain:
The contain table stores the purchases made along with the glasses that are purchased, to know in which purchase the specific glasses were purchased.

# Pila tecnológica:
Frontend: Reactjs

Backend: Express

ORM: Sequialize

# Diagrams

## Use Case
![image](https://github.com/AlejandroCruzPulido/Project/assets/118463976/c4e97046-c900-4f7c-95a1-67edceba59bc)

We can see that the client can carry out the basic activities of the application, which is registering, purchasing, etc.

The admin can manage customer users, glasses, purchase statuses, etc.

And the superadmin can do the same as the admin with the difference that the superadmin can also manage administrative users.

## Class Diagram
![image](https://github.com/AlejandroCruzPulido/Project/assets/118463976/2e9b5875-eaf5-4060-a098-11cb97888c84)

## E/R Diagram
![Proyecto E_R](https://github.com/AlejandroCruzPulido/Project/assets/118463976/6e124c2d-f053-48e7-afca-e31b2be984c1)

## UML Diagram
![Proyecto UML](https://github.com/AlejandroCruzPulido/Project/assets/118463976/8e0e91da-5552-4b43-918a-d8072f014fbe)

## Relational Diagram
![Proyecto Relational](https://github.com/AlejandroCruzPulido/Project/assets/118463976/1b42aaad-cef6-4d70-aef4-7fc45b09f40d)


# Project installation
To install the project we must first clone the repository in our homes using the command:
```
git clone https://github.com/AlejandroCruzPulido
```

Once cloned we perform a
```
cd "/ruta"
```
And we enter the backend route and do the following:
```
npm install
```

And we do the same in the frontend route:
```
npm install
```


And now to start the back and the front we do the following:
In the backend:
```
node index.js
```
And in the frontend:
```
npm start
```

# Tests
To perform the test in the backend, we go to the backend path and execute the following command:
```
npx jest tests/user.test.js --forceExit
```
With that, he performs a test on what would happen if we do not pass the address data but if we pass the rest, what happens is that it fails since in the backend that data is essential
