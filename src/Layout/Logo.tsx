import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="home-logo">
      <img src="images/full-logo.png" alt="logo" />
    </Link>
  );
};

export default Logo;
