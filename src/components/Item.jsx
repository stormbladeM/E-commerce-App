import { Link, NavLink } from "react-router";
import styles from "./Item.module.css";
function Items({ item }) {
  return (
    <NavLink to={`/:product/${item.id}`}>
      <div className={styles.item}>
        <div className={styles.imgContainer}>
          <img src={`${item.image}`} alt="" />
        </div>
        <div>
          <p>{item.title.split(" ").slice(0, 2).join(" ")}</p>
          <hr />
          <p>${item.price}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default Items;
