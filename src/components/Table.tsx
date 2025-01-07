import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import StatusBadge from "./StatusBadge";
import { formatDateTime, formatter } from "../lib/utils";
import { TableProps } from "../types/types";

const Table = ({ columns, data, rowsPerPage }: TableProps) => {
  const [dropdownVisible, setDropdownVisible] = useState<{
    [key: number]: boolean;
  }>({});

  //   HDR: Show/hide the dropdown
  const toggleDropdown = (index: number) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table__row">
                {columns.map((column) => (
                  <td key={column.accessor} className="table__cell">
                    {column.accessor === "actions" ? (
                      <div className="actions">
                        <button
                          className="actions__btn"
                          onClick={() => toggleDropdown(rowIndex)}
                        >
                          <MdMoreVert size={20} />
                        </button>
                        {dropdownVisible[rowIndex] && (
                          <div className="action__dropdown">
                            <div>Edit</div>
                            <div>Delete</div>
                          </div>
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
