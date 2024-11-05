import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/useCartContext";
import { toast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartContext();
  // Get the product ID from URL params
  const [product, setProduct] = useState<any>(null); // Use state to hold the product data
  const [productquantity, setProductquantity] = useState<number>(1);
  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const result = await fetch(
          `https://fakestoreapi.com/products/${id}`
        ).then((res) => res.json());
        setProduct(result);
      }
    };

    getProduct();
  }, [id]); // Only run effect when `id` changes

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="bg-white h-80 w-full md:w-1/2 rounded-md object-contain"
        />
        <div className="p-4 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-lg mt-4">{product.description}</p>
          <Badge>{product.category}</Badge>
          <div className="mt-4 bg-gray-200  w-fit p-2 rounded-md">
            ${product.price}
          </div>

          <form className="w-fit mt-4 ">
            <label
              htmlFor="counter-input"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Choose quantity:
            </label>
            <div className="relative flex items-center">
              <button
                type="button"
                id="decrement-button"
                onClick={() => {
                  setProductquantity((prev) => Math.max(prev - 1, 1));
                }}
                data-input-counter-decrement="counter-input"
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                <svg
                  className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="counter-input"
                data-input-counter
                className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                value={productquantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setProductquantity(value);
                  }
                }}
                required
              />
              <button
                type="button"
                id="increment-button"
                onClick={() => {
                  setProductquantity((prev) => prev + 1);
                }}
                data-input-counter-increment="counter-input"
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                <svg
                  className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="mt-4 space-x-2">
            <Button
              size="lg"
              className=""
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: productquantity,
                });


              }}>
              <Link to="/checkout">Buy Now</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: productquantity,
                });

                toast({
                  description: "Product added to Cart",
                  variant: "destructive",
                });
              }}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
