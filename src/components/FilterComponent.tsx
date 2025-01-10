import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";

type IAProps = {
  name: string;
};
const FilterComponent = ({ name }: IAProps) => {
  const [filterData, setFilterData] = useState({
    username: "",
    email: "",
    phone: "",
    dateJoined: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const componentName = name.toLowerCase();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [componentName]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-component">
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
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Filter</Button>
      </div>
    </div>
  );
};

export default FilterComponent;
