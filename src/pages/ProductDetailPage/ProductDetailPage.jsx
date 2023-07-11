import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { addToCart } from "../../store/cartSlice";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
      );

      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="productCardWrapper">
      <div className="productCardContainer">
        <div className="productCardLeft">
          <img src={product.image} alt="product-image" />
        </div>
        <div className="productCardRight">
          <span className="productCardName">{product.name}</span>
          <span className="productCardPrice">{product.price}</span>

          <button
            className="productCardAddToCartButton"
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  title: product.name,
                  desc: product.description,
                  price: product.price,
                  img: product.image,
                  quantity: 1,
                })
              )
            }
          >
            Add to Cart
          </button>
          <span className="productCardDescription">{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
