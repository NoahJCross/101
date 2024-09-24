import "./postselector.css";

const PostSelector = ({ selectedPostType, onSelect }) => {
  return (
    <div className="app__postselector">
      <h3>Select Post Type</h3>
      <label>
        <input type="radio" value="question" checked={selectedPostType === "question"} onChange={onSelect} />
        Question
      </label>
      <label>
        <input type="radio" value="article" checked={selectedPostType === "article"} onChange={onSelect} />
        Article
      </label>
    </div>
  );
};

export default PostSelector;
