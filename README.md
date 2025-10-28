# MERN-Stack E-Commerce Platform: Warfare Book Store

This is a full-stack e-commerce platform built from the ground up using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is a specialized online bookstore for warfare-related literature, featuring robust user authentication, a dynamic shopping experience, and a complete administrative dashboard.

---

## Features

The platform is divided into two main experiences: the general user-facing site and a secure admin panel.

### 🛡️ Security & Authentication
* **Secure User Authentication:** Full registration and login system.
* **Password Hashing:** User passwords are not stored in plain text, using `bcrypt` for secure hashing.
* **Role-Based Access Control:** The application distinguishes between two roles:
    * **`User`:** Can browse products, manage their cart, and place orders.
    * **`Admin`:** Can access all user features *plus* a dedicated dashboard to manage the entire store.
* **JWT (JSON Web Tokens):** Protected routes and user sessions are managed using secure JWTs, ensuring that only authenticated (and authorized) users can access specific data or perform certain actions.

### 🛒 User-Facing Features (Client)
* **Dynamic Product Catalog:** Browse the full collection of warfare books, complete with details, images, and pricing.
* **Product Search:** A search bar to easily find specific books.
* **Persistent Shopping Cart:** Add/remove items to a cart that persists across sessions (even after logging out and back in).
* **Full Checkout Workflow:** A seamless, multi-step process for users to finalize their purchase.
* **Order History:** Users can view a list of their past orders.

### ⚙️ Admin Dashboard
A comprehensive, secure dashboard for all store management needs:
* **Product Management (CRUD):**
    * **Create:** Add new books to the catalog.
    * **Read:** View all listed products.
    * **Update:** Edit existing product details (price, stock, description).
    * **Delete:** Remove products from the store.
* **User Management:** View a list of all registered users and manage their roles/permissions.
* **Order Management:** Track all incoming orders, view order details, and update their status (e.g., "Pending," "Shipped," "Delivered").

---

## 🛠️ Tech Stack

This project leverages the MERN stack and other modern technologies:

* **Frontend:**
    * **React.js:** For building the dynamic user interface.
    * **React Router:** For client-side routing and navigation.
    * **Context API / Redux:** For global state management (e.g., cart, user auth).
    * **Axios:** For making HTTP requests to the backend API.
* **Backend:**
    * **Node.js:** The JavaScript runtime environment.
    * **Express.js:** The backend framework for building the RESTful API.
* **Database:**
    * **MongoDB:** A NoSQL database used to store product, user, and order data.
    * **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **Authentication:**
    * **JSON Web Tokens (JWT):** For securing API routes.
    * **bcrypt.js:** For hashing and comparing passwords.

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
* Node.js (v14 or later)
* `npm` or `yarn`
* MongoDB (A local instance or a free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Create Environment Variables:**
    In the `backend` folder, create a `.env` file and add the following variables:
    ```.env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    ```

5.  **Run the Application:**
    * **Run Backend (from `backend` folder):**
        ```sh
        npm run dev
        # Your server will start, typically on http://localhost:5000
        ```
    * **Run Frontend (from `frontend` folder):**
        ```sh
        npm start
        # Your React app will start, typically on http://localhost:3000
        ```

You can now access the application in your browser at `http://localhost:3000`.
