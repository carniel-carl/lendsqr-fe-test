import UserAnalyticsCard from "../components/UserAnalyticsCard";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";

import "../styles/pages/users.scss";
import Table from "../components/Table";
import { userData } from "../data/mockData";
import { Column } from "../types/types";

const columns: Column[] = [
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Role", accessor: "role" },
  { header: "Date Joined", accessor: "dateJoined", type: "date" },
  { header: "Status", accessor: "status" },
  { header: "", accessor: "actions" },
];

const UsersPage = () => {
  return (
    <div className="userpage">
      <h1 className="userpage__heading">Users</h1>

      <section className="userpage__user-tabs">
        <UserAnalyticsCard
          label="Users"
          value={2000}
          icon={LuUsers}
          colour="pink"
        />
        <UserAnalyticsCard
          label="Active users"
          value={5000}
          icon={HiOutlineUserGroup}
          colour="purple"
        />
        <UserAnalyticsCard
          label="Users with Loans"
          value={2900}
          icon={TbReportMoney}
          colour="orange"
        />
        <UserAnalyticsCard
          label="Users with Savings"
          value={2000}
          icon={GrMoney}
          colour="red"
        />
      </section>

      <Table columns={columns} data={userData} rowsPerPage={9} />
    </div>
  );
};

export default UsersPage;
