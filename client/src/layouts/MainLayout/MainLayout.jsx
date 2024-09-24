import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import "./mainlayout.css";
import Footer from "../../components/Footer/Footer";
export default function MainLayout() {
  return (
    <div className="app__mainlayout">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
