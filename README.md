# Impresioname
This project is intended to make a website for selling glasses order by the ITC company for realize 

# Relation of the tables:
Users table:
The users table is to store the users that people will be created to access the application.

Directions table:
The address table stores the addresses of the users, it is made so that 1 user can have more than 1 address but 1 address can only have 1 user.

Buys table:
The purchases table stores the purchases made by the user, given that 1 user can make several purchases but 1 purchase can only be made by 1 user.

Glasses table:
The glasses table stores the glasses that exist in the application, which are the products that are sold.

Contain table:
The contain table stores the purchases made along with the glasses that are purchased, to know in which purchase the specific glasses were purchased.

# Technology stack
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

# Figma
Link to see the figma
```
https://www.figma.com/file/ZRGAv6H8ir2uBAHutUZnm7/Glasses?type=design&node-id=0%3A1&mode=design&t=IdDadY4RKTEHJqSc-1
```

# Technologies
## Native Apps:
Description: Native apps are developed specifically for a particular platform or operating system, such as iOS or Android. They are written in languages that are native to the platform, like Swift or Objective-C for iOS and Java or Kotlin for Android.

### Advantages:
- High performance and responsiveness.
- Access to platform-specific features and APIs.
- Enhanced user experience.
### Disadvantages:
- Separate codebases for different platforms.
- Higher development cost and time.

## Hybrid Apps:
Description: Hybrid apps use web technologies (HTML, CSS, JavaScript) and are wrapped in a native container, allowing them to run on multiple platforms. They often leverage frameworks like Cordova or React Native.
### Advantages:
- Code reusability across platforms.
- Faster development compared to native apps.
- Access to some native features.
### Disadvantages:
- Performance may not match native apps.
- Limited access to certain native APIs.
- May have a less polished look and feel.

## Web Apps:
Description: Web apps are applications accessed through a web browser and run on a web server. They are platform-independent and do not need to be installed on a device.
### Advantages:
- Cross-platform compatibility.
- No need for installation.
- Easier maintenance and updates.
### Disadvantages:
- Limited access to device-specific features.
- Requires a stable internet connection.
- Potentially slower performance compared to native apps.

## Progressive Web Apps (PWAs):
Description: PWAs are web applications that provide a native app-like experience. They leverage modern web technologies and service workers to offer features like offline functionality, push notifications, and improved performance.
### Advantages:
- Cross-platform compatibility.
- Offline functionality.
- Improved performance compared to traditional web apps.
### Disadvantages:
- Limited access to certain native APIs.
- May not provide as seamless a user experience as native apps.
- Limited support on older browsers and devices.

My I think what my application Web App, because the app is used for an website with html, there are some examples of the advantages of my technology than the another:

- Cross-Platform Compatibility:
Web apps can run on any device with a compatible web browser, making them inherently cross-platform. Users can access the app on various devices without the need for platform-specific versions.

- No Installation Required:
Users can access web apps instantly without the need for installation from an app store. This can lead to a more straightforward user experience, eliminating the barrier of app downloads.

- Easier Maintenance and Updates:
Web apps can be updated centrally on the server, ensuring that all users instantly receive the latest version. This simplifies the maintenance process and ensures a consistent experience for all users.
