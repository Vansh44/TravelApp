import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-container">
      {!hideNavbarFooter && <Navbar />}

      <main className="content">
        <Outlet />
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
