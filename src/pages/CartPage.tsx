// pages/CartPage.tsx
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/useCartContext";
import React from "react";
import { Link } from "react-router-dom";
const CartPage: React.FC = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cart && cart.length > 0 ? (
        cart.map((prod, idx) => (
          <div
            key={idx}
            className="bg-gray-300 h-20 rounded-md mb-4 flex items-center space-x-4 p-4">
            <img
              src={prod.image}
              alt={prod.title}
              className="h-16 w-16 object-cover rounded-md"
            />
            <div>
              <h1 className="font-semibold">{prod.title}</h1>
              <span>Quantity: {prod.quantity}</span>
              <p>Price: ${prod.price * prod.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="flex space-x-2 ">
        <Link to="/checkout">
          <Button>Proceed to Checkout</Button>
        </Link>
        <Button
          variant="destructive"
          onClick={() => {
            clearCart();
          }}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
