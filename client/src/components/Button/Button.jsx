import "./button.css";
const Button = ({ children, ...rest }) => {
  return (
    <button className="app__button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
