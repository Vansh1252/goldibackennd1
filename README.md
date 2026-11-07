<h1 align="center">E-commerce Store Backend</h1>

<p align="center">
  Backend for an online store with separate <b>admin</b> and <b>customer</b> APIs: products, categories, cart, orders, repair orders and sample orders.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
</p>

---

## Features

**Admin side**

- Admin account creation and login with JWT
- Product and category management: create, edit, list and delete, with image uploads (Multer)
- Order management with pagination, order details, status updates and cancellation
- Repair orders and sample orders handled as their own workflows
- Bag management

**Customer side**

- Customer registration and login
- Browse products and categories
- Cart: add, update and remove items
- Place orders, repair orders and sample orders

## Tech stack

| Layer | Tools |
|---|---|
| Runtime | Node.js |
| Framework | Express (generator structure with `bin/www`) |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens, bcrypt, express-session |
| Uploads | Multer |
| Views | EJS |

## API modules

| Base path | Side | Purpose |
|---|---|---|
| `/admin` | Admin | Create admin, login |
| `/category` | Admin | Manage categories |
| `/product` | Admin | Manage products |
| `/orders` | Admin | List, view, update status and cancel orders |
| `/bags` | Admin | Manage bags |
| `/repairorders` | Admin | Manage repair requests |
| `/sampleorders` | Admin | Manage sample orders |
| `/userlogin` | Customer | Sign up and login |
| `/products`, `/categorys` | Customer | Browse catalogue |
| `/cart` | Customer | Shopping cart |
| `/order` | Customer | Place and track orders |
| `/repairorder`, `/sampleorder` | Customer | Request repairs and samples |

## Project structure

~~~text
├── bin/www            # Server entry point
├── app.js             # Express setup and route mounting
├── controllers/       # Admin and customer controllers
├── models/            # Mongoose schemas
├── routes/            # Express routers
├── validator/         # Request validation
├── utilities/         # Shared helpers
└── uploads/           # Uploaded product images
~~~

## Getting started

**Prerequisites:** Node.js 18+ and MongoDB

~~~bash
git clone https://github.com/Vansh1252/goldibackennd1.git
cd goldibackennd1
npm install
~~~

Create a `.env` file:

~~~env
DATABASE_URL=mongodb://localhost:27017/store
JWT_SECRET=your_jwt_secret
~~~

Start the server:

~~~bash
npm start
~~~

## Author

**Vansh Jain**: [GitHub](https://github.com/Vansh1252) · sanklechav65@gmail.com
