import LoaderIcon from "./LoaderIcon";

const Loading = () => {
  return (
    <div className="loading__container">
      <LoaderIcon />
      <p className="loading__text">Loading...</p>
    </div>
  );
};

export default Loading;
