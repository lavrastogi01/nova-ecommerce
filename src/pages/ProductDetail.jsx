import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart, useWishlist } from '../context/AppContext';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import WishlistSidebar from '../components/WishlistSidebar';
import Toast from '../components/Toast';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  window.__setCartOpen = setIsCartOpen;
  window.__setWishlistOpen = setIsWishlistOpen;

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen bg-base font-outfit flex flex-col items-center justify-center gap-4">
        <p className="text-5xl font-bold text-text-main">404</p>
        <h2 className="text-xl text-text-muted">Product not found</h2>
        <Link to="/" className="btn-primary text-sm mt-4">← Back to Shop</Link>
      </div>
    );
  }

  const isWished = wishlist.some(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product);
    setIsCartOpen(true);
    window.dispatchEvent(new CustomEvent('lavstore-toast', {
      detail: { message: `${product.name} added to cart!` }
    }));
  };

  return (
    <div className="min-h-screen bg-base font-outfit">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-text-main transition-colors no-underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-text-main">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-surface rounded-2xl overflow-hidden group border border-border">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[['🚚', 'Free Shipping'], ['↩️', '30-day Return'], ['🔒', 'Secure Checkout']].map(([ico, lbl]) => (
                <div key={lbl} className="flex flex-col items-center gap-2 py-4 bg-surface rounded-xl border border-border">
                  <span className="text-xl">{ico}</span>
                  <span className="text-text-muted text-xs font-semibold">{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-text-main">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-text-muted text-lg line-through">${product.oldPrice}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="text-gold text-lg">★</span>
              <span className="font-semibold text-text-main">{product.rating}</span>
              <span>({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="text-text-muted text-base leading-relaxed border-y border-border py-6">
              {product.desc}
            </p>

            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={handleAdd} className="flex-1 btn-primary py-4">
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 flex items-center justify-center rounded-xl border text-xl transition-all
                  ${isWished ? 'bg-danger/10 border-danger/20 text-danger' : 'bg-surface border-border text-text-muted hover:text-text-main'}`}
              >
                {isWished ? '♥' : '♡'}
              </button>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-3">
              <h3 className="font-semibold text-text-main">Product Details</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex justify-between border-b border-border pb-2">
                  <span>Category</span>
                  <span className="capitalize text-text-main">{product.category}</span>
                </li>
                <li className="flex justify-between border-b border-border pb-2">
                  <span>Condition</span>
                  <span className="capitalize text-text-main">{product.badge === 'new' ? 'New Arrival' : 'Standard'}</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Availability</span>
                  <span className="text-success font-medium">In Stock</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-32">
            <h2 className="text-2xl font-bold text-text-main mb-8 border-b border-border pb-4">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Toast />
    </div>
  );
}
