# Marvel Merchandise 🦸‍♂️🛒
E-commerce website for Marvel-themed costumes.  
Built using the **MERN stack**: **MongoDB, Express, React, Node.js**.

---

## 📂 Project Structure
The project contains two main folders:
- **backend/** → Node.js, Express.js, MongoDB, Redis  
- **frontend/** → React, React Router DOM, Zustand, Tailwind CSS, and other supporting packages  

---

## ⚙️ Backend Setup (Port: 3000)
1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the backend folder and add:
    MONGODB_URL=your_mongodb_connection_url
    Redis setup is optional, only required for the OTP forgot-password module.
    **(To include forgot-password you need to set up the env varibales for your redis account and you need to give a email and its api-password to send mails or you can leave it to my account.)**

4. Start the server:
   ```bash
   npm run dev # starts with nodemon
   or
   npm start


## 🎨 Frontend Setup (Port: 5173)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
2. Install Dependecies:
   ```bash
   npm install
3. Start the server:
   ```bash
   npm run dev

🛠 Project Flow

1. Run the backend server **(port 3000)**.
2. Run the frontend **(port 5173)**.
3. Create an account and sign in.
4. Add items to the cart.
5. Place orders.
6. Forgot password flow supports OTP validation via Redis (optional).


## 🚀 Running the Project on Your System

### 1. Clone the Repository:
   ```bash
   git clone https://github.com/your-username/Marvel-Merchandise.git
   cd Marvel-Merchandise
```

Enjoy building your Marvel Merchandise store! 🚀
