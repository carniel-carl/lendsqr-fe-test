import { LuLoaderCircle } from "react-icons/lu";

const Loading = () => {
  return (
    <div className="loading__container">
      <LuLoaderCircle />
      <p className="loading__text">Loading...</p>
    </div>
  );
};

export default Loading;
