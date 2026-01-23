import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Loader from "./Loader";
import Sidebar from "../components/Sidebar";

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <Loader />}
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>
          {/* Main Content */}
          <main className="min-h-[calc(100vh-200px)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Applayout;
