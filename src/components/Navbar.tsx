// components/Navbar.tsx
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCartContext } from "@/context/useCartContext";
const Navbar: React.FC = () => {
  const { cart } = useCartContext();
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          YourBrand
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="w-1/3 p-2 rounded-md"
        />
        <div className="flex space-x-4">
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/account" className="hover:underline">
            <User />
          </Link>
          <Link to="/cart" className="relative hover:underline">
            <ShoppingCart />
            {cart.length > 0  && (
              <span className="absolute top-2/3 right-1/2 bg-red-700 text-white text-sm w-5 h-5  rounded-full flex justify-center items-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
