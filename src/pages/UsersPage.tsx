import UserAnalyticsCard from "../components/UserAnalyticsCard";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";

import { FaEye } from "react-icons/fa";
import { BsPersonCheck, BsPersonFillX } from "react-icons/bs";

import Table from "../components/Table";
import { userData } from "../data/mockData";
import { Column } from "../types/types";
import Button from "../components/Button";
import "../styles/pages/users.scss";
import DropdownMenu from "../components/DropdownMenu";
import { MdFilterList, MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import FilterComponent from "../components/FilterComponent";

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
  const navigate = useNavigate();

  // HDR: Render Action Component
  const actionsComponet = useCallback((data: { [key: string]: any }) => {
    return (
      <DropdownMenu trigger={<MdMoreVert size={20} />} showCaret={false}>
        <div className="space-y-20 ">
          <Button
            variant="neutral"
            className="neutral_link"
            onClick={() => navigate(`/users/${data.username}`)}
          >
            <FaEye size={18} />
            <span>View Details</span>
          </Button>
          <Button variant="neutral" className="neutral_link">
            <BsPersonFillX size={18} />
            <span>Blacklist User</span>
          </Button>
          <Button variant="neutral" className="neutral_link">
            <BsPersonCheck size={18} />
            <span>Activate User</span>
          </Button>
        </div>
      </DropdownMenu>
    );
  }, []);

  // HDR: Render Filter Component
  const filterComponent = useCallback((column: string) => {
    return (
      <DropdownMenu
        trigger={<MdFilterList size={18} />}
        className="filter-dropdown"
        showCaret={false}
        align="center"
        bordered
      >
        <FilterComponent name={column} />
      </DropdownMenu>
    );
  }, []);

  console.log("Render Filter Component");
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

      <Table
        columns={columns}
        data={userData}
        renderActions={actionsComponet}
        filterHeader
        showPagination
        renderFilter={filterComponent}
      />
    </div>
  );
};

export default UsersPage;
