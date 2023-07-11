import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductList from "../../components/ProductList/ProductList";
import Filter from "../../components/Sidebar/Filter";
import { fetchProducts } from "../../store/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        marginBottom: "3rem",
      }}
    >
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <Filter />

        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
