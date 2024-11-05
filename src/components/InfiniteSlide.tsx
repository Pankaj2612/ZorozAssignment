import { InfiniteSlider } from "@/components/InfiniteSlider";
import React from "react";
import { Link } from "react-router-dom";

export function InfiniteSliderHoverSpeed() {
  const [product, setProduct] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getProduct = async () => {
      const result = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
      );
      setProduct(result);
    };

    getProduct();
  }, []); // Empty dependency array to run only once

  return (
    <InfiniteSlider gap={24} reverse>
      {product &&
        product.map((prod, idx) => (
          <Link to={`/products/${idx + 1}`} key={idx}>
            <img
              key={idx}
              src={prod.image}
              alt={prod.title}
              className="h-[150px] w-auto rounded-[4px] shadow-sm"
            />
          </Link>
        ))}
    </InfiniteSlider>
  );
}
