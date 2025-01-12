import UserAnalyticsCard from "../components/UserAnalyticsCard";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";

import { FaEye } from "react-icons/fa";
import { BsPersonCheck, BsPersonFillX } from "react-icons/bs";

import Table from "../components/Table";
import { Column, FilterDataType, User } from "../types/types";
import Button from "../components/Button";
import "../styles/pages/users.scss";
import DropdownMenu from "../components/DropdownMenu";
import { MdFilterList, MdMoreVert } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import FilterComponent from "../components/FilterComponent";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services";
import Loading from "../components/Loading";

type UserStatType = {
  active: number;
  loans: number;
  savings: number;
};

const columns: Column[] = [
  { header: "Organisation", accessor: "organisation" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Date Joined", accessor: "dateJoined", type: "date" },
  { header: "Status", accessor: "status" },
  { header: "", accessor: "actions" },
];

const UsersPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParams = useMemo(() => {
    return {
      username: searchParams.get("username"),
      email: searchParams.get("email"),
      phone: searchParams.get("phone"),
      organisation: searchParams.get("organisation"),
      status: searchParams.get("status"),
      dateJoined: searchParams.get("dateJoined"),
    };
  }, [searchParams]);

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUser(),
  });

  // HDR: Calculate the statitics fromm the userData
  const usersStat: UserStatType = useMemo(() => {
    if (userData) {
      return userData.reduce(
        //@ts-ignore
        (acc, user) => {
          if (user.status === "active") {
            acc.active += 1;
          }
          if (user.financialDetails.hasLoan) {
            acc.loans += 1;
          }
          if (user.financialDetails.hasSavings) {
            acc.savings += 1;
          }
          return acc;
        },
        {
          active: 0,
          loans: 0,
          savings: 0,
        }
      );
    } else {
      return {
        active: 0,
        loans: 0,
        savings: 0,
      };
    }
  }, [userData]);

  //HDR: Function to filter data based on filterParams
  const data = useMemo(() => {
    const options = filterParams;

    let filterData = userData as User[];

    if (options?.username) {
      filterData = filterData?.filter((item) =>
        item.username?.toLowerCase().includes(options.username!.toLowerCase())
      );
    }
    if (options?.email) {
      filterData = filterData?.filter(
        (item) => item.email?.toLowerCase() === options.email!.toLowerCase()
      );
    }
    if (options?.organisation) {
      filterData = filterData?.filter(
        (item) =>
          item.organisation?.toLowerCase() ===
          options.organisation!.toLowerCase()
      );
    }
    if (options?.status) {
      filterData = filterData?.filter(
        (item) => item.status?.toLowerCase() === options.status!.toLowerCase()
      );
    }
    if (options?.phone) {
      filterData = filterData?.filter((item) =>
        item.phone?.toLowerCase().includes(options.phone!.toLowerCase())
      );
    }
    if (options?.dateJoined) {
      filterData = filterData?.filter((item) =>
        item.dateJoined
          ?.toLowerCase()
          .includes(options.dateJoined!.toLowerCase())
      );
    }
    return filterData;
  }, [filterParams, userData]);

  // HDR: Render Action Component
  const actionsComponet = (data: User) => {
    const navigationHandler = (url: string) => {
      localStorage.setItem("userLendsqr", JSON.stringify(data));
      navigate(url);
    };

    return (
      <DropdownMenu trigger={<MdMoreVert size={20} />} showCaret={false}>
        <div className="userpage__action-dropdown">
          <Button
            variant="neutral"
            className="neutral_link action-dropdown_link"
            onClick={() => navigationHandler(`/users/${data.id}`)}
          >
            <FaEye size={18} />
            <span>View Details</span>
          </Button>
          <Button
            variant="neutral"
            className="neutral_link action-dropdown_link"
          >
            <BsPersonFillX size={18} />
            <span>Blacklist User</span>
          </Button>
          <Button
            variant="neutral"
            className="neutral_link action-dropdown_link"
          >
            <BsPersonCheck size={18} />
            <span>Activate User</span>
          </Button>
        </div>
      </DropdownMenu>
    );
  };

  // HDR: Render Filter Component
  const filterComponent = (column: string) => {
    const closeDropdown = () => {
      closeDropdown();
    };
    return (
      <DropdownMenu
        trigger={<MdFilterList size={18} />}
        className="filter-dropdown"
        showCaret={false}
        align="center"
        bordered
      >
        <FilterComponent name={column} closeDropdown={closeDropdown} />
      </DropdownMenu>
    );
  };

  // HDR: JSX
  return (
    <div className="userpage">
      <h1 className="userpage__heading">Users</h1>
      {/* SUB: Loading */}
      {isLoading && <Loading />}

      {/* SUB: Data */}
      {userData && (
        <>
          <section className="userpage__user-tabs">
            <UserAnalyticsCard
              label="Users"
              value={userData?.length}
              icon={LuUsers}
              colour="pink"
            />
            <UserAnalyticsCard
              label="Active users"
              value={usersStat?.active}
              icon={HiOutlineUserGroup}
              colour="purple"
            />
            <UserAnalyticsCard
              label="Users with Loans"
              value={usersStat.loans}
              icon={TbReportMoney}
              colour="orange"
            />
            <UserAnalyticsCard
              label="Users with Savings"
              value={usersStat.savings}
              icon={GrMoney}
              colour="red"
            />
          </section>

          <Table
            columns={columns}
            data={data}
            renderActions={actionsComponet}
            filterHeader
            showPagination
            renderFilter={filterComponent}
          />
        </>
      )}
      {/* SUB: NO Data */}
      {error && <div className="error-container">Error fetching data</div>}
    </div>
  );
};

export default UsersPage;
