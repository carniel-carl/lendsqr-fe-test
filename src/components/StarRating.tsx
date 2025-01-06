import { MdOutlineStarBorder, MdStar } from "react-icons/md";

type IAProps = {
  rating: number;
  total?: number;
};
const StarRating = ({ rating, total = 3 }: IAProps) => {
  const stars = [];

  for (let i = 1; i <= total; i++) {
    if (i <= rating) {
      //? filled star
      stars.push(<MdStar key={i} size={18} color="#E9B200" />);
    } else {
      //? outlined star
      stars.push(<MdOutlineStarBorder key={i} size={20} color="#E9B200" />);
    }
  }
  return <div className="space-2">{stars}</div>;
};

export default StarRating;
