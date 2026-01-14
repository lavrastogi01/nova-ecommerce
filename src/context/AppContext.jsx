import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const WishlistContext = createContext();
const ThemeContext = createContext();

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
export const useTheme = () => useContext(ThemeContext);

export function AppProviders({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('lavstore_cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('lavstore_wishlist')) || [];
    const savedTheme = localStorage.getItem('lavstore_theme') || 'dark';
    setCart(savedCart);
    setWishlist(savedWishlist);
    setTheme(savedTheme);
    // Apply class immediately on load to prevent flash
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lavstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lavstore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lavstore_theme', theme);
    // Tailwind darkMode: 'class' needs 'dark' class on <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );
  const clearCart = () => setCart([]);
  const toggleWishlist = (product) => setWishlist(prev => {
    const exists = prev.find(i => i.id === product.id);
    return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
  });
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
          {children}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}
