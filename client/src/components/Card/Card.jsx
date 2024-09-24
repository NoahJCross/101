import "./card.css";
import { IoMdStar } from "react-icons/io";

const Card = ({ card }) => {
  return (
    <div className="app__card">
      <img src={card.img} alt={card.headline} />
      <div className="app__card-body">
        <h3>{card.headline}</h3>
        <p className="app__card-desc text-desc">{card.abstract}</p>
        <hr />
        <div className="app__card-container">
          <div className="app__card-stars">
            <IoMdStar size={24} color="gold" />
            <p>{card.stars}</p>
          </div>
          <p>
            <strong>{card.author}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
