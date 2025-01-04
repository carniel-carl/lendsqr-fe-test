import { Link } from "react-router-dom";

type LogoProps = {
  dashboard?: boolean;
};
const Logo = ({ dashboard }: LogoProps) => {
  return (
    <Link to="/" className={`home-logo ${dashboard && "dashboard_logo"}`}>
      <img src="images/full-logo.png" alt="logo" />
    </Link>
  );
};

export default Logo;
