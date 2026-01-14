import { Link } from 'react-router-dom';
import { useCart, useWishlist } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWished = wishlist.some(i => i.id === product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    window.dispatchEvent(new CustomEvent('lavstore-toast', {
      detail: { message: `${product.name} added to cart!` }
    }));
  };

  return (
    <article className="group relative bg-card border border-border rounded-xl overflow-hidden
      transition-all duration-300 hover:shadow-soft flex flex-col cursor-pointer">

      {/* Top row badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="flex gap-1.5">
          {product.badge === 'sale' && discount && (
            <span className="badge-sale">−{discount}%</span>
          )}
          {product.badge === 'new' && (
            <span className="badge-new">New</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200
            hover:scale-110 active:scale-90
            ${isWished ? 'bg-danger/10 text-danger' : 'bg-surface border border-border text-text-muted hover:text-text-main'}`}
        >
          {isWished ? '♥' : '♡'}
        </button>
      </div>

      {/* Image area */}
      <Link to={`/product/${product.id}`}
        className="relative block h-56 bg-surface overflow-hidden no-underline">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <span className="text-gold">★</span>
          <span className="font-semibold">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>

        <Link to={`/product/${product.id}`} className="no-underline">
          <h3 className="font-bold text-text-main text-sm leading-snug line-clamp-1
            group-hover:text-accent transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <p className="text-text-muted text-xs leading-relaxed line-clamp-2 flex-1">{product.desc}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="space-y-0.5">
            <div className="text-lg font-black text-text-main leading-none">${product.price}</div>
            {product.oldPrice && (
              <div className="text-text-muted text-xs line-through">${product.oldPrice}</div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 bg-accent rounded-full font-bold text-base text-lg flex items-center justify-center
              transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
