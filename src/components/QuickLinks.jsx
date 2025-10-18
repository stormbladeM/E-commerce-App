import styles from "./QuickLinks.module.css";
import { FaUser, FaQuestionCircle, FaShoppingCart } from "react-icons/fa";
function QuickLinks() {
  return (
    <div className={styles.QuickLinks}>
      <ul>
        <li>
          <FaUser /> Acoount
        </li>
        <li>
          <FaQuestionCircle /> Help
        </li>
        <li>
          {" "}
          <FaShoppingCart /> Cart
        </li>
      </ul>
    </div>
  );
}

export default QuickLinks;
