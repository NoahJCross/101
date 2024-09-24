import "./home.css";
import { articles, tutorials } from "../../assets/articles";
import banner from "../../assets/banner.jpg";
import FeaturedView from "../../components/FeaturedView/FeaturedView";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  return (
    <div className="app__home">
      <div className="app__home-banner">
        <img src={banner} alt="deakin building" />
      </div>
      <FeaturedView cards={articles} title={"Articles"} />
      <FeaturedView cards={tutorials} title={"Tutorials"} />
      <Newsletter />
    </div>
  );
};

export default Home;
