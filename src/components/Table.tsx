import StatusBadge from "./StatusBadge";
import { formatDateTime, formatter } from "../lib/utils";
import { TableProps } from "../types/types";
import DropdownMenu from "./DropdownMenu";
import { MdFilterList } from "react-icons/md";

const Table = ({
  columns,
  data,
  rowsPerPage,
  renderActions,
  filterHeader,
}: TableProps) => {
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
      <div className="table-container" id="tableId">
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              {columns.map((column) => (
                <th key={column.accessor} className="table__head--cell">
                  <span>{column.header}</span>
                  {filterHeader && column.accessor !== "actions" && (
                    <DropdownMenu
                      trigger={<MdFilterList size={18} />}
                      className="filter-dropdown"
                      showCaret={false}
                    >
                      <p>Filter options for {column.header}</p>
                    </DropdownMenu>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {paginatedData.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className="table__row">
                  {columns.map((column) => (
                    <td key={column.accessor} className="table__cell">
                      {column.accessor === "actions" ? (
                        renderActions ? (
                          renderActions(row)
                        ) : (
                          <p>No Action</p>
                        )
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

      {/*  HDR: Pagination */}
    </section>
  );
};

export default Table;
