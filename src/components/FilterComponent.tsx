import { useEffect, useMemo, useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { FilterDataType } from "../types/types";
import CustomSelect from "./CustomSelect";
import { organisationsData } from "../data/organisations-data";
import { statusData } from "../data/status-data";

type IAProps = {
  name: string;
  closeDropdown: () => void;
};
const FilterComponent = ({ name, closeDropdown }: IAProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const [filterData, setFilterData] = useState<FilterDataType>({
    username: filterParams.username || "",
    email: filterParams.email || "",
    phone: filterParams.phone || "",
    organisation: filterParams.organisation || "",
    status: filterParams.status || "",
    dateJoined: filterParams.dateJoined || "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const componentName = name.toLowerCase();

  //   HDR: Focus on the dropdown element
  useEffect(() => {
    if (selectRef.current && !inputRef.current) {
      selectRef.current.focus();
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [componentName]);

  //   HDR: Change handler function
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({ ...prevData, [name]: value }));
  };

  //   HDR: Submit handler function
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => value)
    );
    const query = new URLSearchParams();
    Object.entries(nonEmptyFilters).forEach(([key, value]) => {
      query.set(key, value);
    });
    setSearchParams(query);
    closeDropdown();
  };

  const resetHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterData({
      username: "",
      email: "",
      phone: "",
      dateJoined: "",
    });
    searchParams.delete("username");
    searchParams.delete("email");
    searchParams.delete("phone");
    searchParams.delete("organisation");
    searchParams.delete("status");
    searchParams.delete("dateJoined");
    setSearchParams(searchParams);
    closeDropdown();
  };

  const organisations = useMemo(() => {
    return organisationsData.map((item) => {
      return { value: item, label: item.toUpperCase() };
    });
  }, []);
  const status = useMemo(() => {
    return statusData.map((item) => {
      return { value: item, label: item.toUpperCase() };
    });
  }, []);

  return (
    <form onSubmit={submitHandler} className="filter-component">
      <div>
        <label className="label" htmlFor="organisation">
          Organisation
        </label>

        <CustomSelect
          id="organisation"
          options={organisations}
          ref={componentName === "organisation" ? selectRef : null}
          onChange={changeHandler}
          value={filterData.organisation}
          name="organisation"
        />
      </div>
      <div>
        <Input
          ref={componentName === "username" ? inputRef : null}
          variant="regular"
          label="Username"
          placeholder="User"
          name="username"
          onChange={changeHandler}
          value={filterData.username}
          id="username"
        />
      </div>
      <div>
        <Input
          ref={componentName === "email" ? inputRef : null}
          variant="regular"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          onChange={changeHandler}
          value={filterData.email}
          id="email"
        />
      </div>
      <div>
        <Input
          ref={componentName === "phone" ? inputRef : null}
          variant="regular"
          label="Phone Number"
          placeholder="Phone Number"
          name="phone"
          type="phone"
          onChange={changeHandler}
          value={filterData.phone}
          id="phone"
        />
      </div>
      <div>
        <Input
          ref={componentName === "datejoined" ? inputRef : null}
          variant="regular"
          label="Date"
          placeholder="Date"
          name="dateJoined"
          type="date"
          onChange={changeHandler}
          value={filterData.dateJoined}
          id="dateJoined"
        />
      </div>
      <div>
        <label className="label" htmlFor="organisation">
          Status
        </label>

        <CustomSelect
          id="status"
          options={status}
          ref={componentName === "status" ? selectRef : null}
          onChange={changeHandler}
          value={filterData.status}
          name="status"
        />
      </div>
      <div className="filter-component__buttons">
        <Button variant="secondary" type="button" onClick={resetHandler}>
          Reset
        </Button>
        <Button variant="primary">Filter</Button>
      </div>
    </form>
  );
};

export default FilterComponent;
