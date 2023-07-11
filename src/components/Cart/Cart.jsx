import "./Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../store/cartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cartProducts.cartProducts);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const handleIncrementQuantity = (product) => {
    dispatch(incrementQuantity(product));
  };
  const handleDecrementQuantity = (product) => {
    dispatch(decrementQuantity(product));
  };

  return (
    <div className="cartWrapper">
      <h1 className="header">Products in your cart</h1>

      {products?.map((item) => (
        <div className="cartItem" key={item.id}>
          {/* <img className="prodImg" src={item.image} alt="prod-image" /> */}
          <div className="details">
            <span className="itemTitle">{item.title}</span>
            <div className="price">{item.price}₺</div>
          </div>
          <div className="quantity">
            <button
              className="quantityButton"
              onClick={() => handleDecrementQuantity(item)}
            >
              -
            </button>
            <span
              style={{
                color: "black",
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
              }}
            >
              {item.quantity}
            </span>
            <button
              className="quantityButton"
              onClick={() => handleIncrementQuantity(item)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>₺{totalPrice()} </span>
      </div>
      <button className="checkButton">PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default Cart;
