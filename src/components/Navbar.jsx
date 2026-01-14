import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useWishlist, useTheme } from '../context/AppContext';

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-outfit
      ${scrolled
        ? 'bg-base/95 backdrop-blur-md border-b border-border shadow-sm'
        : 'bg-base border-b border-border'
      }
    `}>
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-8 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group no-underline mr-2">
          {/* N icon */}
          <div className="w-8 h-8 bg-accent text-base rounded-lg flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90">
            <span className="text-base font-black tracking-tight">N</span>
          </div>
          <span className="text-xl font-black tracking-tight text-text-main">
            NOVA
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm select-none">⌕</span>
          <input
            type="text"
            value={searchVal}
            onChange={e => { setSearchVal(e.target.value); onSearch?.(e.target.value); }}
            placeholder="Search products, brands…"
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-10 py-2 text-sm text-text-main
              placeholder-textMuted outline-none transition-all duration-200 focus:border-accent"
          />
          {searchVal && (
            <button onClick={() => { setSearchVal(''); onSearch?.(''); }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main text-xs transition-colors">✕</button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <IconBtn onClick={toggleTheme} title="Theme">{theme === 'dark' ? '☀' : '☽'}</IconBtn>
          <IconBtn onClick={() => window.__setWishlistOpen?.(true)} badge={wishlist.length} title="Wishlist">♡</IconBtn>
          <IconBtn
            onClick={() => window.__setCartOpen?.(true)}
            badge={cartCount}
            title="Cart"
            highlight
          >
            ⌀
          </IconBtn>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, badge, onClick, title, highlight }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative h-9 w-9 flex items-center justify-center rounded-xl text-base transition-all duration-200 active:scale-95
        ${highlight
          ? 'bg-accent text-base hover:opacity-90'
          : 'bg-surface border border-border text-text-muted hover:text-text-main hover:border-textMuted'
        }`}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-danger text-[9px] font-bold
          flex items-center justify-center text-white leading-none">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}
