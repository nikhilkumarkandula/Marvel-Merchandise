# 🦸‍♂️ Marvel Merchandise 🛒

An e-commerce web application for Marvel-themed costumes, built using the **MERN stack** — **MongoDB, Express, React, Node.js**.
The app allows users to browse Marvel-inspired collections, add items to the cart, place orders, and optionally reset passwords using OTP verification with Redis.

---

## 📂 Project Structure

```
Marvel-Merchandise/
│
├── backend/   # Node.js + Express + MongoDB + Redis
│
└── frontend/  # React + React Router DOM + Zustand + Tailwind CSS + DaisyUI
```

---

## ⚙️ Backend Setup (Port: 3000)

### 1️⃣ Navigate to the backend folder:

```bash
cd backend
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Configure Environment Variables:

Create a `.env` file inside the `backend` folder and add:

```
MONGODB_URL=your_mongodb_connection_url
```

* **Redis setup (optional):**
  Required only if you want to enable OTP-based forgot-password functionality.
  You’ll need to provide:

  * Redis credentials
  * Email and app password (for Nodemailer)

  *(You may also use the default credentials already configured in the project for testing.)*

### 4️⃣ Start the server:

```bash
npm run dev   # Starts with nodemon
# or
npm start
```

Backend runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🎨 Frontend Setup (Port: 5173)

### 1️⃣ Navigate to the frontend folder:

```bash
cd frontend
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Start the server:

```bash
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## 🧭 Project Flow

1. Run the backend server (**port 3000**)
2. Run the frontend (**port 5173**)
3. Create an account and sign in
4. Add Marvel costumes (hoodies, t-shirts) to the cart
5. Place an order
6. (Optional) Use OTP-based forgot-password flow via Redis

---

## 🚀 Running the Project on Your System

### 1️⃣ Clone the Repository:

```bash
git clone https://github.com/your-username/Marvel-Merchandise.git
cd Marvel-Merchandise
```

### 2️⃣ Run Backend Server:

```bash
cd backend
npm run dev
# or
npm start
```

### 3️⃣ Run Frontend:

```bash
cd frontend
npm run dev
```

### 4️⃣ Open the App:

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

Enjoy building your own Marvel Merchandise Store! 🚀

---

## 💡 Assumptions and Design Choices

* 🧩 Uses **MongoDB Atlas** (cloud) for database, can also run locally.
* 🧠 **Zustand** chosen over Redux for lightweight and performant state management.
* 🎨 **Tailwind CSS + DaisyUI** used for modern, fast, and responsive UI design.
* 🔐 **JWT-based authentication** with tokens stored in localStorage.
* ⚡ **Redis** used for OTP-based forgot-password flow (optional).
* ⚙️ Ports:

  * Backend → `3000`
  * Frontend → `5173`

---

## 🧪 Testing

Currently, no automated test cases are implemented.
You can manually test functionality by:

* Signing up and signing in.
* Adding products to the cart.
* Placing an order.
* Testing forgot-password flow with Redis setup.

---

## 🔮 Future Enhancements

* 🧾 Order invoice generation
* 🔔 Email/SMS notifications for orders
* 💬 Live chat support

---
