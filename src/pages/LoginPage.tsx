import Logo from "../Layout/Logo";
import "../styles/pages/login.scss";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login__image-section">
        <header className="login__logo">
          <Logo />
        </header>
        <div className="login__hero-image">
          <img
            src="images/sign-in.png"
            alt="Man going through door illustration"
          />
        </div>
      </div>
      <div className="login__form-section">form</div>
    </div>
  );
};

export default LoginPage;
