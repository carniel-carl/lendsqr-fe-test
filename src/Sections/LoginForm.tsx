import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginForm = () => {
  return (
    <div className="login__form-container">
      <h2 className="login__heading">Welcome!</h2>
      <p className="login__subheading">Enter details to login.</p>

      <form className="login__form">
        <Input placeholder="Email" type="email" />
        <Input placeholder="password" type="password" />
        <Link to="#" className="forget_passowrd__link">
          Forget Password ?
        </Link>
        <Button className="login_btn">LOG IN</Button>
      </form>
    </div>
  );
};

export default LoginForm;
