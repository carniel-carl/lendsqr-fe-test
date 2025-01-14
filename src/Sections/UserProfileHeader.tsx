import StarRating from "../components/StarRating";
import { formatter } from "../lib/utils";
import { User } from "../types/types";

const UserProfileHeader = ({ user }: { user: User }) => {
  return (
    <section className="user-details__profile">
      {/*SUB: Profile Data */}
      <div className="user-details__data">
        <div className="user-details__avatar">
          <img src="https://picsum.photos/106" alt="User Avatar" />
        </div>
        <div className="user-details__info">
          <div>
            <h2 className="user-details__name">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="user-details__code">LSQFf587g90</p>
          </div>
          <span className="vertical__rule" />

          <div>
            <h4 className="user-details__tier">User's Tier</h4>

            <StarRating rating={user?.profile.tier} />
          </div>

          <span className="vertical__rule" />

          <div>
            <p className="user-details__balance">
              {formatter({ style: "currency", currency: "NGN" }).format(
                user.profile.accountBalance
              )}
            </p>
            <span className="user-details__account">
              {user.profile.accountNumber} / {user.profile.bank}
            </span>
          </div>
        </div>
      </div>

      {/*SUB: Tabs */}
      <div className="user-details__tabs">
        <button className="user-details__tab active">General Details</button>
        <button className="user-details__tab">Documents</button>
        <button className="user-details__tab">Bank Details</button>
        <button className="user-details__tab">Loans</button>
        <button className="user-details__tab">Savings</button>
        <button className="user-details__tab">App and System</button>
      </div>
    </section>
  );
};

export default UserProfileHeader;
