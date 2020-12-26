# Vuomail-Nodejs
A simple web application that sends emails to Gmail without changing malicious content settings,
for this it authenticates users through Google OAuth2, using the Passport.js module.

## Clone project
Run the following command `git clone https://github.com/IvanZM123/Vuomail-Nodejs.git`. 
This command will clone this project on your computer.
To run this command you need to have [Git](https://git-scm.com/downloads) installed on your computer.

## Installation
Once the project is cloned, enter the project directory and run the following command: `npm i`.
This command will download all the dependencies that our project needs to work.
It is worth mentioning that you need to have [Node.js](https://nodejs.org/es/) installed.
___
As in this project we are saving the emails sent in [MongoDB](https://www.mongodb.com/try/download/community), 
you need to install the program.

## Development server
For the project to work properly you need to add an `.env` file to the root of the project.
To know the variables to use, enter the path `src/app/environments/environment.js`
___
Once the packages have been downloaded, run the following commands:
1. `npm run build` This command will compile the Typescript code to JavaScript, and generate a dist folder.
2. `npm run serve` This command will execute the Javascript code and create a development server.
