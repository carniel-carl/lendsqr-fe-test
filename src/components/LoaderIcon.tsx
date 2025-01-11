import { LuLoaderCircle } from "react-icons/lu";
type IAProps = {
  size?: "sm" | "md" | "lg";
};

const LoaderIcon = ({ size = "md" }: IAProps) => {
  return <LuLoaderCircle className={`loader__icon ${size} `} />;
};

export default LoaderIcon;
