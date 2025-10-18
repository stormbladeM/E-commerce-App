import { useState } from "react";
import styles from "./SearchQuery.module.css";

function SearchQuery() {
  const [query, setQuery] = useState("");
  function handleSetQuery(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }
  return (
    <div className={styles.SearchQuery}>
      <form className={styles.SearchForm}>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSetQuery}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchQuery;
