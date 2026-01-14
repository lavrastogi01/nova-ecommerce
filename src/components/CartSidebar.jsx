import { useCart } from '../context/AppContext';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <div onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      <aside className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-base border-l border-border z-50
        flex flex-col transition-transform duration-300 ease-out shadow-soft-lg
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-text-main">Your Cart</h2>
            <p className="text-text-muted text-xs mt-0.5">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface border border-border
              text-text-muted hover:text-text-main transition-all text-sm">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted text-xl">
                🛒
              </div>
              <div>
                <p className="text-text-main font-semibold">Cart is empty</p>
                <p className="text-text-muted text-xs mt-1">Add products to get started</p>
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id}
                className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3">
                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-border">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-main text-sm truncate">{item.name}</p>
                  <p className="font-bold text-text-main text-sm">${item.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-card border border-border text-text-muted hover:bg-border hover:text-text-main flex items-center justify-center text-sm transition-all">
                    −
                  </button>
                  <span className="text-text-main font-bold text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-card border border-border text-text-muted hover:bg-border hover:text-text-main flex items-center justify-center text-sm transition-all">
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-danger transition-colors ml-1">
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-border space-y-4 bg-surface">
            <div className="space-y-2 mb-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-text-main">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Shipping</span>
                <span className="text-text-main font-medium">Calculated at checkout</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-text-main font-bold">Total</span>
                <span className="font-black text-lg text-text-main">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full btn-primary text-sm">Checkout</button>
            <button onClick={clearCart} className="w-full text-center text-text-muted hover:text-text-main text-xs font-semibold py-2">Clear Cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
