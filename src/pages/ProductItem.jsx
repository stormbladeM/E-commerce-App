import Header from "../components/Header";
import ProductInformation from "../components/ProductInformation";
import DisplayItems from "../components/DisplayItems";
import DeliveryBar from "../components/DeliveryBar";
import styles from "./ProductItem.module.css";
function ProductItem() {
  return (
    <div className={styles.container}>
      <Header />
      <ProductInformation />
      <DeliveryBar />
    </div>
  );
}

export default ProductItem;
