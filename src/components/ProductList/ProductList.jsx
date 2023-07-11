import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import NotFound from "../NotFound/NotFound";
import Spinner from "../Spinner/Spinner";
import "./ProductList.css";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const productList = useSelector((state) => state.products.productList);
  const selectedBrands = useSelector((state) => state.products.selectedBrands);
  const selectedModels = useSelector((state) => state.products.selectedModels);
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const status = useSelector((state) => state.products.status);

  const data = productList
    ?.filter(
      (product) =>
        selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    )
    ?.filter(
      (product) =>
        selectedModels.length === 0 || selectedModels.includes(product.model)
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const lastPage = Math.ceil(data.length / productsPerPage);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <div className="list">
            {currentProducts?.length > 0 ? (
              currentProducts?.map((item) => <Card item={item} key={item.id} />)
            ) : (
              <>
                <NotFound />
              </>
            )}
          </div>
          {currentProducts?.length > 0 && (
            <div className="pagination">
              <button
                className="pagiBtn"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              >
                {currentPage}
              </span>
              <button
                className="pagiBtn"
                onClick={goToNextPage}
                disabled={
                  currentPage === Math.ceil(data.length / productsPerPage)
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
