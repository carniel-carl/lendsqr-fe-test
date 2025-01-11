import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import LoaderIcon from "../components/LoaderIcon";
import { ChangeEvent, FormEvent, useState } from "react";
import { delay } from "../lib/utils";
import { useAuth } from "../store/context/AuthContext";

const LoginForm = () => {
  const { setLoggedInUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  // HDR: Valid Input values and save in state
  const validateLogin = () => {
    const { email, password } = loginData;
    let isValid: boolean = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setLoginError((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setLoginError((prev) => ({ ...prev, email: "Invalid email" }));
      isValid = false;
    } else {
      setLoginError((prev) => ({ ...prev, email: "" }));
    }

    if (!password) {
      setLoginError((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    } else {
      setLoginError((prev) => ({ ...prev, password: "" }));
    }

    if (isValid) {
      const username = email.split("@")[0];
      const loggedInUser = {
        email,
        username,
        loggedInTime: new Date(),
      };

      return loggedInUser;
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // HDR: Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const valid = validateLogin();
    if (!valid) return;
    setLoading(true);
    await delay(3);
    try {
      localStorage.setItem("loggedInUser:Lendqr", JSON.stringify(valid));
      setLoggedInUser(valid);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login__form-container">
      <h2 className="login__heading">Welcome!</h2>
      <p className="login__subheading">Enter details to login.</p>

      <form className="login__form" onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          label="Email"
          variant="primary"
          placeholder="email"
          error={loginError.email}
          name="email"
          value={loginData.email}
          onChange={changeHandler}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          variant="primary"
          placeholder="password"
          name="password"
          error={loginError.password}
          value={loginData.password}
          onChange={changeHandler}
          autoComplete="current-password"
        />
        <Link to="#" className="forget_passowrd__link">
          Forget Password ?
        </Link>
        <Button className="login_btn" disabled={loading}>
          {loading ? <LoaderIcon size="sm" /> : "LOG IN"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
