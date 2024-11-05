// pages/HomePage.tsx
import { Link } from "react-router-dom";
import React from "react";
import { InfiniteSliderHoverSpeed } from "./InfiniteSlide";
import Card from "./ProductCard";

type ProductType = {
  title: string;
  price: number;
  category: string;
  image: string;
};

const HomePage: React.FC = () => {
  const [product, setproduct] = React.useState<ProductType[]>();
  React.useEffect(() => {
    const getproduct = async () => {
      const result = await fetch(
        "https://fakestoreapi.com/products?limit=20"
      ).then((res) => res.json());
      setproduct(result);
    };

    getproduct();
  }, [product]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Welcome to YourBrand</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
        <div className="w-full">
          <InfiniteSliderHoverSpeed />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Popular Products</h2>
        <div className="grid  grid-cols-1  md:grid-cols-5 gap-4">
          {product && product.length > 0 ? (
            product.map((prod, idx) => (
              <Link to={`/products/${idx + 1}`} key={idx}>
                <Card
                  title={prod.title}
                  price={prod.price}
                  category={prod.category}
                  image={prod.image}
                />
              </Link>
            ))
          ) : (
            <>
              <Link
                to="/products/1"
                className="bg-gray-300 h-40 rounded"></Link>
              <Link
                to="/products/2"
                className="bg-gray-300 h-40 rounded"></Link>
              <Link
                to="/products/3"
                className="bg-gray-300 h-40 rounded"></Link>
              <Link
                to="/products/4"
                className="bg-gray-300 h-40 rounded"></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
