import { useState } from "react";
import Button from "../Button/Button";
import "./newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/newsletter-signup", {
        // Update this to your server's endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail("");
      } else {
        console.log("Failed to sign up.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app__newsletter">
      <h1>Sign Up to Our Newsletter!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
};

export default Newsletter;
