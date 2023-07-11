import "./Card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const Card = (item) => {
  const dispatch = useDispatch();
  return (
    <>
      <Link className="linkToDetail" to={`/product/${item.item.id}`}>
        <div className="product-card">
          <img
            src={item?.item?.image}
            alt="Product Image"
            className="product-image"
          />
          <p className="product-price">{item?.item.price}₺</p>
          <h3 className="product-title">{item?.item.name}</h3>

          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addToCart({
                  id: item?.item.id,
                  title: item?.item.name,
                  desc: item?.item.description,
                  price: item?.item.price,
                  img: item?.item.image,
                  quantity: 1,
                })
              );
            }}
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </>
  );
};

export default Card;
