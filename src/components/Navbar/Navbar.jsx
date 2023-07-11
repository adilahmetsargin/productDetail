import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/productSlice";
import SearchIcon from "../../assets/SearchIcon";
import TotalPriceIcon from "../../assets/TotalPriceIcon";
import ProfileIcon from "../../assets/ProfileIcon";
import Cart from "../Cart/Cart";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.searchTerm);
  const products = useSelector((state) => state.cartProducts.cartProducts);

  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e));
  };

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  return (
    <div className="navbarContainer">
      <Link
        style={{ cursor: "pointer", textDecoration: "none", color: "white" }}
        className="navbarLeft"
      >
        Eteration
      </Link>
      <div className="navbarCenter">
        <SearchIcon />
        <input
          className="navSearchInput"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="navbarRight">
        <div className="iconWithText" onClick={() => setOpen(!open)}>
          <TotalPriceIcon />
          <span>₺{totalPrice()}</span>
        </div>
        <div className="iconWithText">
          <ProfileIcon />
          <span>Username</span>
        </div>
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 998,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {open && <Cart />}
    </div>
  );
};
export default Navbar;
