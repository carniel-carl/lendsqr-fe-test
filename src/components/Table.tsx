import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import StatusBadge from "./StatusBadge";
import { formatDateTime, formatter } from "../lib/utils";
import { TableProps } from "../types/types";
import DropdownBox from "./DropdownBox";
import Button from "./Button";
import { FaEye } from "react-icons/fa";
import useClickOutside from "../hooks/useClickOutside";

const Table = ({ columns, data, rowsPerPage }: TableProps) => {
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState<
    number | null
  >(null);

  //   HDR: Show/hide the dropdown
  const toggleDropdown = (index: number) => {
    setDropdownVisibleIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  //   HDR: Show the number of rows in the table
  const paginatedData = data.slice(0, rowsPerPage);

  //   HDR: Format the data on a column
  const formatData = (value: any, type?: string) => {
    if (type === "number") {
      return formatter({}).format(value);
    } else if (type === "currency") {
      return formatter({ style: "currency", currency: "NGN" }).format(value);
    } else if (type === "date") {
      return formatDateTime(value);
    }
    return value;
  };

  return (
    <section className="table-section">
      {/*  HDR: Table component */}
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              {columns.map((column) => (
                <th key={column.accessor} className="table__head--cell">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {paginatedData.map((row, rowIndex) => {
              const { ref, visible, setVisible } = useClickOutside(false);

              return (
                <tr key={rowIndex} className="table__row">
                  {columns.map((column) => (
                    <td key={column.accessor} className="table__cell">
                      {column.accessor === "actions" ? (
                        <div className="actions" ref={ref}>
                          <button
                            className="actions__btn"
                            onClick={() => {
                              toggleDropdown(rowIndex);
                              setVisible(!visible);
                            }}
                          >
                            <MdMoreVert size={20} />
                          </button>
                          {dropdownVisibleIndex === rowIndex && visible && (
                            <DropdownBox className="actions__dropdown">
                              <Button
                                variant="neutral"
                                className="neutral_link"
                              >
                                <FaEye size={18} />
                                <span>View Details</span>
                              </Button>
                              <Button
                                variant="neutral"
                                className="neutral_link"
                              >
                                <FaEye size={18} />
                                <span>View Details</span>
                              </Button>
                            </DropdownBox>
                          )}
                        </div>
                      ) : column.accessor === "status" ? (
                        <StatusBadge status={row[column.accessor]} />
                      ) : (
                        formatData(row[column.accessor], column.type)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
