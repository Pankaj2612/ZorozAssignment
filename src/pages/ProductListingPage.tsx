// pages/ProductListingPage.tsx
import Card from "@/components/ProductCard";
import { SelectCategory, Sort } from "@/components/SelectCategory";
import React from "react";
import { Link } from "react-router-dom";

type ProductType = {
  title: string;
  price: number;
  category: string;
  image: string;
};
const ProductListingPage: React.FC = () => {
  const [product, setProduct] = React.useState<ProductType[]>();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [sortOrder, setSortOrder] = React.useState<string>("none");

  React.useEffect(() => {
    const getProducts = async () => {
      const result = await fetch(
        "https://fakestoreapi.com/products?limit=20"
      ).then((res) => res.json());
      setProduct(result);
    };

    getProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    if (!product) return [];

    let filtered = product;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((prod) => prod.category === selectedCategory);
    }

    if (sortOrder === "ascending") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "descending") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [product, selectedCategory, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="flex ">
        <aside className="w-1/4 p-4 bg-gray-100 rounded-md mr-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className=" flex items-center justify-evenly h-10 mt-2 ">
            Category <SelectCategory onChange={setSelectedCategory} />
          </div>
          <div className="flex items-center justify-evenly h-10 mt-2 ">
            Sort by <Sort onChange={setSortOrder} />
          </div>
        </aside>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-3/4">
          {filteredProducts &&
            filteredProducts.map((prod, idx) => (
              <Link to={`/products/${idx + 1}`} key={idx}>
                <Card
                  title={prod.title}
                  price={prod.price}
                  category={prod.category}
                  image={prod.image}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
