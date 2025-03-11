# Node.js Blog API

A simple blog API built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **JWT authentication**.

## Features
- User authentication with **JWT**
- **CRUD operations** for managing blog posts
- **Input validation** using `express-validator`
- **Request logging** for debugging
- **Postman collection** included for testing

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** and add the following:
   ```env
   PORT=5005
   MONGO_URI=mongodb://localhost:27017/blog-api
   JWT_SECRET=your_secret_key
   ```

4. **Start MongoDB (if running locally):**
   ```sh
   mongod
   ```
   *Or use Docker:*
   ```sh
   docker run -d -p 27017:27017 --name mongo mongo
   ```

5. **Run the server:**
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:5005`

## API Endpoints

### **Auth Routes**
| Method | Endpoint      | Description        | Authentication |
|--------|--------------|--------------------|----------------|
| POST   | `/api/auth/signup`  | Register a new user  | No |
| POST   | `/api/auth/login`   | Login & get token   | No |

### **Blog Routes**
| Method | Endpoint      | Description           | Authentication |
|--------|--------------|----------------------|----------------|
| POST   | `/api/blogs/`      | Create a new blog  | ✅ Yes (JWT) |
| GET    | `/api/blogs/`      | Get all blogs      | ❌ No |
| GET    | `/api/blogs/:id`   | Get a single blog  | ❌ No |
| PUT    | `/api/blogs/:id`   | Update a blog      | ✅ Yes (JWT) |
| DELETE | `/api/blogs/:id`   | Delete a blog      | ✅ Yes (JWT) |

## Logging Requests
The server logs all incoming requests, including:
- **Request method**
- **Endpoint**
- **Response status**
- **Timestamp**

## Postman Collection
A Postman collection is available for easy API testing. Import `blogging_collection.json` into Postman.

## Contributing
Feel free to fork this repo and submit pull requests!

## License
MIT License

