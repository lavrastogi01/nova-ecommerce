import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import WishlistSidebar from '../components/WishlistSidebar';
import Toast from '../components/Toast';
import { products } from '../data/products';

const CATS = [
  { id: 'all',          label: 'All',         icon: '◈' },
  { id: 'electronics',  label: 'Electronics',  icon: '⚡' },
  { id: 'fashion',      label: 'Fashion',      icon: '◆' },
  { id: 'accessories',  label: 'Accessories',  icon: '◇' },
  { id: 'lifestyle',    label: 'Lifestyle',    icon: '❋' },
];

const SORTS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function Home() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  window.__setCartOpen = setIsCartOpen;
  window.__setWishlistOpen = setIsWishlistOpen;

  let filtered = products.filter(p => {
    const catOk = cat === 'all' || p.category === cat;
    const q = query.toLowerCase();
    const searchOk = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  if (sort === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const currentCat = CATS.find(c => c.id === cat);

  return (
    <div className="min-h-screen bg-base font-outfit">
      <Navbar onSearch={setQuery} />
      <Hero />

      {/* Shop section */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-2">— Shop</p>
            <h2 className="text-3xl font-black text-text-main leading-none">
              {cat === 'all' ? 'All Products' : `${currentCat?.icon} ${currentCat?.label}`}
            </h2>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">Sort by</span>
            <div className="flex gap-1.5">
              {SORTS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                    ${sort === s.value
                      ? 'bg-text-main text-base border border-text-main'
                      : 'bg-surface border border-border text-text-muted hover:text-text-main hover:border-text-muted'
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-border">
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                ${cat === c.id
                  ? 'bg-text-main text-base'
                  : 'bg-surface border border-border text-text-muted hover:text-text-main hover:border-text-main'
                }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
          <span className="ml-auto flex-shrink-0 text-text-muted text-xs">{filtered.length} items</span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center text-4xl text-text-muted">
              ⌕
            </div>
            <div className="text-center">
              <p className="text-text-main font-bold">No results found</p>
              <p className="text-text-muted text-sm mt-1">Try a different search or category</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-text-main rounded-lg flex items-center justify-center">
              <span className="text-sm font-black text-base">N</span>
            </div>
            <span className="text-lg font-black text-text-main">NOVA</span>
          </div>
          <p className="text-text-muted text-sm">© 2025 NOVA. All rights reserved.</p>
          <div className="flex items-center gap-5 text-text-muted text-sm">
            {['Privacy', 'Terms', 'Support'].map(l => (
              <span key={l} className="hover:text-text-main cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Toast />
    </div>
  );
}
