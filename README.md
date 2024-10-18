
# Primekart

Primekart is a full-stack e-commerce platform built using the MERN stack, offering a seamless and secure shopping experience with real-time features, dynamic listings, and drag-and-drop functionality.

## Features

- **OTP-Based Authentication**: Secure and hassle-free login with mobile OTP verification.
- **Dynamic Product Listings**: Products are updated in real-time for an interactive user experience.
- **Shopping Cart, Wishlist & Save For Later**: Easily add items to your cart, wishlist or save for later with real-time management.
- **Drag-and-Drop**: Smooth drag-and-drop functionality for managing items across the cart and wishlist.
- **Lazy Loading**: Improves page load times by loading components as needed.
- **Debounced Search**: Optimized search functionality with debouncing to minimize server requests and enhance the user experience.
- **Razorpay Payment Integration**: Seamless payment processing with Razorpay.
- **Responsive Design**: Optimized for all devices to ensure a great user experience.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Email OTP
- **Payment Gateway**: Razorpay
- **State Management**: Redux Toolkit

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bobby-coder/Primekart.git
   cd Primekart
   ```
   
3. Install dependencies for both client and server

   Navigate to the client folder and install dependencies:
   
   ```bash
   cd client
   npm install
   ```

   Navigate to the server folder and install dependencies:
   
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables
   
   Configure your .env files in both the client and server with necessary variables, such as:
     - MongoDB connection URI
     - Razorpay API keys
  
4. Run the app

   Start the client (frontend):

   ```bash
   cd client
   npm run dev
   ```

   Start the server (backend):

   ```bash
   cd server
   npm run start
   ```

## Usage

- Navigate to the homepage to browse dynamic product listings.
- Securely log in using OTP-based authentication.
- Change Password, reset password and change email.
- Add products to the cart, save for later or wishlist, and manage them with drag-and-drop features.
- Proceed to checkout and make payments through Razorpay.
