import { useWishlist, useCart } from '../context/AppContext';

export default function WishlistSidebar({ isOpen, onClose }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <div onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      <aside className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-base border-l border-border z-50
        flex flex-col transition-transform duration-300 ease-out shadow-soft-lg
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-text-main">Wishlist</h2>
            <p className="text-text-muted text-xs mt-0.5">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface border border-border
              text-text-muted hover:text-text-main transition-all text-sm">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted text-xl">
                ♡
              </div>
              <div>
                <p className="text-text-main font-semibold">Nothing saved yet</p>
                <p className="text-text-muted text-xs mt-1">Tap ♡ on any product to save it</p>
              </div>
            </div>
          ) : (
            wishlist.map(item => (
              <div key={item.id}
                className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3">
                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-border">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-main text-sm truncate">{item.name}</p>
                  <p className="font-bold text-text-main text-sm">${item.price}</p>
                  <button
                    onClick={() => { addToCart(item); toggleWishlist(item); onClose(); }}
                    className="text-[11px] font-bold text-accent hover:opacity-80 transition-colors mt-1"
                  >
                    + Move to Cart
                  </button>
                </div>
                <button onClick={() => toggleWishlist(item)}
                  className="text-text-muted hover:text-danger transition-colors text-sm">✕</button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
