import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("https://backend.magnateshop.uz/api/products", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data.items);
        } else {
          toast.error(res.message);
        }
      });
  }, []);

  return (
    <div>
      <ProductsTable data={data} />
    </div>
  );
};

export default Products;
