# ECOMMERCE-APIs

## Description
This API provides a set of endpoints for creating users, products with categories, color, and brand and  also making orders, built using Node.js and Express. It integrates with MongoDB for data storage, Stripe for payment processing, and uses JWT for Authentication, 

## Table of Contents
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Contributions](#contributions)
- [License](#license)

## Technologies Used
- **Programming Language**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **Payment Processing**: Stripe
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Render
- **Version Control**: GitHub
- **Testing and Documentation**: Postman, and JSON formatter
- **Development Environment**: Visual Studio Code,

## Architecture
The API is built using a microservices architecture, with separate services for users, products, and orders. Each service communicates over HTTP, and JWT is used for secure authentication.

## Installation
To install the API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
2. Navigate to the project directory
   cd your-repo
3. Install dependencies:
   npm install
    Usage
 To use the API, start the server:
 npm run server

 Access the API at http://localhost:7000.
 For webhook 
 Steps to use Webhooks
Open the webhooks page.
Click the "Add Webhook" button.
Click the "Add Command" button and create your action as desired.
If necessary, map JSON and add actions.
Save the command and use the "Copy URL" button to grab the trigger for the webhook.
WARNED: ANYONE THAT GETS ACCESS TO THIS URL COULD TRIGGER THE ACTION! Only share this URL with trusted sources. The URL is in the form of: https://api.mixitupapp.com/api/webhook/{SomeId}?secret=

Go to the external website, such as KoFi and enter the necessary information. KoFi Config
At this point, you should be able to test the webhook and the event should trigger!


Endpoints
The API provides the following endpoints:

The API documentation can be accessed here https://documenter.getpostman.com/view/38827290/2sAXxWYU7A
Authentication
This API uses JWT for authentication. To obtain a token, users must log in with their credentials. The token should be included in the Authorization header for protected routes.
Example of Token Usage
Authorization: Bearer <your_jwt_token>

We learnt  from IT Education Network since it was our first API complex creation
Deployed link https://dapperfit-api.onrender.com kindly read the API documentation above in Order for you to understand.
Collaboration is  highly encouraged feel free to form our Repository


License
This API is licensed under the MIT License.
