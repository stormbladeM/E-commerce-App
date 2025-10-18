import { useRef } from "react";
import { useProductContext } from "../contexts/useProductContext";
import styles from "./DisplayItems.module.css";
import ItemList from "./ItemList.jsx";

function DisplayItems() {
  const { products } = useProductContext();
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={() => scroll("left")}>←</button>
      <ItemList products={products} scrollRef={scrollRef} />
      <button onClick={() => scroll("right")}>→</button>
    </div>
  );
}

export default DisplayItems;
