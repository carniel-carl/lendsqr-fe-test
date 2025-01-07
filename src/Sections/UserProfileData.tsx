import "../styles/sections/userprofiledata.scss";

type IAProps = {
  title: string;
  data: {
    label: string;
    value: string | number;
  }[];
};
const UserProfileData = ({ title, data }: IAProps) => {
  return (
    <article className="user-profile-data">
      <h4 className="user-profile-data--heading">{title}</h4>
      <div className="user-profile-data__content">
        {data.map((item, index) => (
          <div key={index} className="user-profile-data__item">
            <p className="user-profile-data__label">{item.label}</p>
            <p className="user-profile-data__value">{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default UserProfileData;
