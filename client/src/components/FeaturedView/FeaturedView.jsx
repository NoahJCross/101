import Card from "../Card/Card";
import "./featuredview.css";

const FeaturedView = ({ title, cards }) => {
  return (
    <section className="app__featuredview">
      <h1>Featured {title}</h1>
      <div className="app__featuredview-cards">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      <button>
        <h3>See all {title}</h3>
      </button>
    </section>
  );
};

export default FeaturedView;
