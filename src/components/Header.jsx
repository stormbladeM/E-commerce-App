import styles from "./Header.module.css";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";
import SearchQuery from "./SearchQuery";
function Header() {
  return (
    <div className={styles.Header}>
      <Logo />
      <SearchQuery />
      <QuickLinks />
    </div>
  );
}

export default Header;
