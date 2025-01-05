import { formatter } from "../lib/utils";
import { UserAnalyticsCardProps } from "../types/types";

const UserAnalyticsCard = ({
  icon: Icon,
  label,
  value,
  colour,
}: UserAnalyticsCardProps) => {
  return (
    <div className="analytics-card">
      <div className={`analytics-card__icon ${colour}`} aria-hidden="true">
        <Icon size={25} />
      </div>
      <p className="analytics-card__label">{label}</p>
      <span className="analytics-card__value">
        {formatter({ decimal: 0 }).format(value)}
      </span>
    </div>
  );
};

export default UserAnalyticsCard;
