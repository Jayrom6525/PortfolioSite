import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css'; // Import cart styles

const Cart = ({ isLoggedIn }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart', {
          method: 'GET',
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Add the auth token to the headers
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (serviceId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await fetch(`http://localhost:5000/cart/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
      });
      setCartItems(cartItems.filter(item => item.id !== serviceId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <img src={item.img} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;