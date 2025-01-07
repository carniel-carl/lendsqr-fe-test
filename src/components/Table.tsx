import { useState } from "react";
import { MdMoreVert } from "react-icons/md";

type Column = {
  header: string;
  accessor: string;
};

type TableProps = {
  columns: Column[];
  data: { [key: string]: any }[];
  rowsPerPage: number;
};

const Table = ({ columns, data, rowsPerPage }: TableProps) => {
  const [dropdownVisible, setDropdownVisible] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const paginatedData = data.slice(0, rowsPerPage);

  const statusBadge = (status: string) => {
    const statusClass =
      {
        active: "badge--active",
        inactive: "badge--inactive",
        pending: "badge--pending",
      }[status.toLowerCase()] || "badge--default";

    return <span className={`badge ${statusClass}`}>{status}</span>;
  };

  return (
    <section className="table-section">
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              {columns.map((column) => (
                <th key={column.accessor} className="table__col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table__row">
                {columns.map((column) => (
                  <td key={column.accessor} className="table__col">
                    {column.accessor === "actions" ? (
                      <div className="actions">
                        <button
                          className="actions__btn"
                          onClick={() => toggleDropdown(rowIndex)}
                        >
                          <MdMoreVert size={20} />
                        </button>
                        {dropdownVisible[rowIndex] && (
                          <div className="dropdown">
                            <div>Edit</div>
                            <div>Delete</div>
                          </div>
                        )}
                      </div>
                    ) : column.accessor === "status" ? (
                      statusBadge(row[column.accessor])
                    ) : (
                      row[column.accessor]
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
