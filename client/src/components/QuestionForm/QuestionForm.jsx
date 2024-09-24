import Button from "../Button/Button";
import { useState } from "react";
import { firestore, serverTimestamp } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import "./questionform.css";

const QuestionForm = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const question = formData.get("question");

    const tags = formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim());

    try {
      await addDoc(collection(firestore, "questions"), {
        title,
        question,
        code,
        tags,
        createdAt: serverTimestamp(),
      });

      e.target.reset();
      setCode("");
      alert("Question posted successfully");
    } catch (error) {
      console.error("Error posting question: ", error);
      throw new Error(error.message);
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <form className="app__questionform" onSubmit={handleSubmit}>
      <div className="form-group form-title">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="Title..."
          required
          disabled={formDisabled}
        />
      </div>

      <div className="form-group">
        <label htmlFor="question">Describe your problem</label>
        <textarea
          id="question"
          name="question"
          className="form-control"
          placeholder="Enter your question..."
          rows="4"
          required
          disabled={formDisabled}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="code">Add Code below</label>
        <CodeMirror
          id="code"
          height="300px"
          value={code}
          extensions={[markdown()]}
          theme={oneDark}
          onChange={(value) => setCode(value)}
          disabled={formDisabled}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="form-control"
          placeholder="Tags..."
          required
          disabled={formDisabled}
        />
      </div>
      <div className="form-btn-container">
        <Button type="submit" disabled={formDisabled}>
          Post
        </Button>
      </div>

      <div className="form-group">
        <label>Preview</label>
        <div className="markdown-preview">
          <ReactMarkdown>{code}</ReactMarkdown>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
