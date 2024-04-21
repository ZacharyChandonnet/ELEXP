import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {

  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
