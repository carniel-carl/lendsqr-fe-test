import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginForm = () => {
  return (
    <div className="login__form-container">
      <h2 className="login__heading">Welcome!</h2>
      <p className="login__subheading">Enter details to login.</p>

      <form className="login__form">
        <Input
          type="email"
          id="email"
          label="Email"
          variant="primary"
          placeholder="email"
        />
        <Input
          type="password"
          id="password"
          label="Password"
          variant="primary"
          placeholder="password"
        />
        <Link to="#" className="forget_passowrd__link">
          Forget Password ?
        </Link>
        <Button className="login_btn">LOG IN</Button>
      </form>
    </div>
  );
};

export default LoginForm;
