import Advert from "./components/Advert";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Siderbar from "./components/Siderbar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />
      <Siderbar />
      <Advert />
      <Footer />
    </div>
  );
}

export default AppLayout;
