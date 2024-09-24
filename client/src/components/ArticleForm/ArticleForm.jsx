import Button from "../Button/Button";
import { useState } from "react";
import { storage, firestore, serverTimestamp } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./articleform.css";

const ArticleForm = () => {
  const [image, setImage] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const abstract = formData.get("abstract");
    const article = formData.get("article");
    const tags = formData
      .get("tags")
      .split(",")
      .map((tag) => tag.trim());

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(firestore, "articles"), {
        title,
        abstract,
        article,
        tags,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      e.target.reset();
      setImage(null);
      alert("Post added successfully");
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <form className="app__articleform" onSubmit={handleSubmit}>
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
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
          disabled={formDisabled}
        />
      </div>

      <div className="form-group">
        <label htmlFor="abstract">Abstract</label>
        <textarea
          id="abstract"
          name="abstract"
          className="form-control"
          placeholder="Enter a 1 paragraph abstract..."
          rows="4"
          required
          disabled={formDisabled}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="article">Article</label>
        <textarea
          id="article"
          name="article"
          className="form-control"
          placeholder="Enter your article here..."
          rows="10"
          required
          disabled={formDisabled}
        ></textarea>
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
    </form>
  );
};

export default ArticleForm;
