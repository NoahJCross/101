import "./questionview.css";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const QuestionView = ({ question, handleDelete }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    return dateObject.toLocaleString();
  };

  return (
    <div className="app__questionview" key={question.id}>
      <div className="app__questionview-container">
        <div>
          <h3>{question.title}</h3>
          <p>{question.question}</p>
          <p className="text-desc">Tags: {question.tags.join(", ")}</p>
          <p className="text-desc">Date: {formatTimestamp(question.createdAt)}</p>
        </div>
        <button className="app__questionview-chevron" onClick={toggleActive}>
          {isActive ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
        </button>
        <button className="app__questionview-button" onClick={() => handleDelete(question.id)}>
          Delete <MdDelete size={24} color="darkred" />
        </button>
      </div>
      {isActive && (
        <div className="app__questionview-details">
          <ReactMarkdown>{question.code}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QuestionView;
