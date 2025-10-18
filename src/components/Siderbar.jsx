import styles from "./Sidebar.module.css";
import { FaBook, FaMugHot, FaTshirt } from "react-icons/fa";
function Siderbar() {
  return (
    <div className={styles.Sidebar}>
      <ul>
        <li>
          <FaMugHot />
          Appliances
        </li>
        <li>
          <FaBook />
          Books
        </li>
        <li>
          <FaTshirt />
          Clothes
        </li>
        <li>Electronics</li>
        <li>Food</li>
        <li>Gadgets</li>
        <li>Health</li>
        <li>Home</li>
        <li>Kitchen</li>
        <li>Sports</li>
        <li>Toys</li>
        <li>Watches</li>
      </ul>
    </div>
  );
}

export default Siderbar;
