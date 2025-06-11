import React, { useState, useEffect, useContext, createContext } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import './Cart.css';

// Cart Context for global state management
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Icon Component
export const CartIcon = ({ className = '' }) => {
  const { getCartItemsCount, setIsCartOpen } = useCart();
  const itemsCount = getCartItemsCount();

  return (
    <button 
      className={`cart-icon ${className}`}
      onClick={() => setIsCartOpen(true)}
      aria-label={`Shopping cart with ${itemsCount} items`}
    >
      <ShoppingCart size={24} />
      {itemsCount > 0 && (
        <span className="cart-badge">{itemsCount}</span>
      )}
    </button>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img 
          src={item.image || '/api/placeholder/80/80'} 
          alt={item.name}
          loading="lazy"
        />
      </div>
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="quantity-display">{item.quantity}</span>
            
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

// Main Cart Component
const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    getCartTotal,
    clearCart
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Order placed successfully!');
      clearCart();
      setIsCartOpen(false);
    } catch (error) {
      alert('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    // Prevent body scroll when cart is open
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={64} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some items to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-actions">
                    <button
                      className="clear-cart-btn"
                      onClick={clearCart}
                      disabled={isCheckingOut}
                    >
                      Clear Cart
                    </button>
                    
                    <button
                      className="checkout-btn"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Add to Cart Button Component
export const AddToCartButton = ({ 
  product, 
  quantity = 1, 
  className = '',
  children = 'Add to Cart',
  showQuantitySelector = false
}) => {
  const { addToCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Brief loading state
    addToCart(product, selectedQuantity);
    setIsAdding(false);
  };

  return (
    <div className={`add-to-cart-container ${className}`}>
      {showQuantitySelector && (
        <div className="quantity-selector">
          <label htmlFor={`quantity-${product.id}`}>Qty:</label>
          <select
            id={`quantity-${product.id}`}
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            className="quantity-select"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <button
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : children}
      </button>
    </div>
  );
};

// Mini Cart Component (for showing cart summary in header)
export const MiniCart = () => {
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();
  const itemsCount = getCartItemsCount();
  const total = getCartTotal();

  if (itemsCount === 0) return null;

  return (
    <div className="mini-cart">
      <div className="mini-cart-info">
        <span className="mini-cart-count">{itemsCount} items</span>
        <span className="mini-cart-total">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;