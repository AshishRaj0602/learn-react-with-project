import { useEffect, useState } from "react";
import ProductCard from "../component/productCard/card";
import "./product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  // useEffect(()=>{
  //      // compononentwillmount // before mounting
  // })
  // any state change this effect will call

  const fetchProductData = async () => {
    setLoader(true);
    try {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();
      setLoader(false);
      setProducts(result.products);
    } catch (error) {
      setLoader(false);
      alert("Something went wrong!!! Please try Again!!");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  // empty dependency useEffect most case wwe call the api here , or do the action in first load

  const increment = (e, product) => {
    e.stopPropagation(); // stopping event bubbling
    console.log("Adding", product);
  };

  const productClicked = (product) => {
    window.location.href = "https://my.newtonschool.co/";
  };

  return (
    <div className="product-cont">
      {loader ? (
        <div className="loader">
          <img src="/Loading_icon.gif" />
        </div>
      ) : (
        products.map((item) => {
          // item is one product with it details
          return (
            <ProductCard
              product={item}
              increment={increment}
              productClicked={productClicked}
            />
          );
        })
      )}
    </div>
  );
};

export default Product;