# NOVA — Premium E-Commerce

![NOVA Preview](https://img.shields.io/badge/Status-Completed-success) ![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

A high-performance e-commerce frontend built with **React**, **Vite**, and **Tailwind CSS**. Designed with a premium, minimalist aesthetic that focuses on high-quality product imagery, clean typography, and seamless user experience.

## ✨ Features

- **Premium Minimal UI:** Clean layout, editorial typography (Outfit font), solid flat colors, and refined micro-interactions.
- **Dark & Light Mode:** Fully responsive theme toggle that adapts all components and persists via `localStorage`.
- **Global State Management:** Cart and Wishlist functionality built entirely from scratch using the React Context API (no external bloated libraries).
- **Dynamic Filtering & Sorting:** Real-time search, category filtering, and price/rating sorting implemented with fast array methods.
- **Product Details:** Dedicated dynamic routing (`/product/:id`) with related products, image galleries, and detailed specs.
- **Responsive Design:** Carefully optimized layouts for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **State Management:** React Context API + LocalStorage
- **Icons & Assets:** Native CSS/UTF-8 symbols for maximum performance

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js installed on your machine.
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/lavrastogi/nova-ecommerce.git
   ```
2. Navigate to the project directory:
   ```sh
   cd E-Commerce
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5178`

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Hero, ProductCard, Sidebars)
├── context/          # React Context providers (Cart, Wishlist, Theme)
├── data/             # Mock product database (products.js)
├── pages/            # Page components (Home, ProductDetail)
├── App.jsx           # Main application routing & context wrapper
├── index.css         # Global styles, variables, & Tailwind configuration
└── main.jsx          # React entry point
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
