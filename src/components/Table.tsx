import StatusBadge from "./StatusBadge";
import { formatDateTime, formatter } from "../lib/utils";
import { TableProps } from "../types/types";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Table = ({
  columns,
  data,
  renderActions,
  filterHeader,
  showPagination,
  renderFilter,
}: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") as string) || 1;

  const [rowsPerPage, setRowsPerPage] = useState(10);

  //SUB: Calculate total pages
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  //   SUB: Remove page param from the url when data is less than rows per page
  useEffect(() => {
    if (data && data.length < rowsPerPage) {
      setSearchParams((params) => {
        params.delete("page");
        return params;
      });
    }
  }, [data, rowsPerPage, setSearchParams]);

  //SUB: Show the number of rows in the table
  const startIndex =
    data && data.length < rowsPerPage ? 0 : (currentPage - 1) * rowsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + rowsPerPage);

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
              {columns?.map((column) => (
                <th key={column.accessor} className="table__head--cell">
                  <span>{column.header}</span>
                  {filterHeader &&
                    renderFilter &&
                    column.accessor !== "actions" &&
                    renderFilter(column.accessor)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {paginatedData && paginatedData?.length === 0 ? (
              <tr className="table__row">
                <td className="table__cell empty" colSpan={columns.length}>
                  No Data
                </td>
              </tr>
            ) : (
              paginatedData?.map((row, rowIndex) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*  HDR: Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage as number}
          totalPages={totalPages}
          dataLength={data?.length}
          rowsperPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </section>
  );
};

export default Table;
