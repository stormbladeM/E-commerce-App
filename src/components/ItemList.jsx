import styles from "./ItemList.module.css";
import Items from "./Item.jsx";
function ItemList({ products, scrollRef }) {
  return (
    <div className={styles.ItemList} ref={scrollRef}>
      {products.length ? (
        products.slice(0, 10).map((item) => <Items key={item.id} item={item} />)
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ItemList;
