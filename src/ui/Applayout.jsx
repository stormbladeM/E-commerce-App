import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Loader from "./Loader";
import Sidebar from "../components/Sidebar";

function Applayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {isLoading && <Loader />}
      {/* Fixed Header */}
      <Header />
      
      {/* Main Container with Sidebar and Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 h-full py-6">
            {/* Fixed Sidebar - hidden on mobile, shown on desktop */}
            <aside className="hidden lg:block overflow-y-auto">
              <Sidebar />
            </aside>
            {/* Scrollable Main Content */}
            <main className="overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applayout;
