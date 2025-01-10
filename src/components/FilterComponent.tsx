import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { FilterDataType } from "../types/types";

type IAProps = {
  name: string;
  closeDropdown: () => void;
};
const FilterComponent = ({ name, closeDropdown }: IAProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = JSON.parse(searchParams.get("query") || "{}");

  const [filterData, setFilterData] = useState<FilterDataType>({
    username: filterParams.username || "",
    email: filterParams.email || "",
    phone: filterParams.phone || "",
    dateJoined: filterParams.dateJoined || "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const componentName = name.toLowerCase();

  //   HDR: Focus on the dropdown element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [componentName]);

  //   HDR: Change handler function
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({ ...prevData, [name]: value }));
  };

  //   HDR: Submit handler function
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => value)
    );
    if (Object.keys(nonEmptyFilters).length > 0) {
      searchParams.set("query", JSON.stringify(nonEmptyFilters));
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
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
    searchParams.delete("query");
    setSearchParams(searchParams);
    closeDropdown();
  };

  return (
    <form onSubmit={submitHandler} className="filter-component">
      <div>
        <Input
          ref={componentName === "username" ? inputRef : null}
          variant="regular"
          label="Username"
          placeholder="User"
          name="username"
          onChange={changeHandler}
          value={filterData.username}
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
