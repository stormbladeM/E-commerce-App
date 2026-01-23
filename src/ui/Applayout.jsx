import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Loader from "./Loader";

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <div className="h-dvh md:mx-[10%] s">
        <Header />
        <main className="h-[90%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Applayout;
