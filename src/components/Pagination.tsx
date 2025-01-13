import Button from "./Button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { CgChevronDown } from "react-icons/cg";
import { PaginationProps } from "../types/types";

const Pagination = ({
  currentPage,
  totalPages,
  dataLength,
  rowsperPage,
  setRowsPerPage,
}: PaginationProps) => {
  const dropdownOptions = [10, 20, 30, 50, 100];

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const filteredOptions = dropdownOptions.filter(
    (option) => option <= dataLength
  );

  // HDR: Page change handler
  const paginationHandler = (val: number) => {
    current.set("page", val.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";

    navigate(`${pathname}${query}`);
  };

  // HDR: BUTTONS RENDERED
  const renderPageNumbers = () => {
    const pages = [];

    //SUB: Always show the first two buttons
    pages.push(
      <Button
        key={1}
        variant="neutral"
        onClick={() => paginationHandler(1)}
        className={`${currentPage === 1 ? "active" : ""} pagination__button`}
      >
        1
      </Button>
    );

    if (totalPages > 1) {
      pages.push(
        <Button
          key={2}
          variant="neutral"
          onClick={() => paginationHandler(2)}
          className={`${currentPage === 2 ? "active" : ""} pagination__button`}
        >
          2
        </Button>
      );
    }
    if (totalPages > 2) {
      pages.push(
        <Button
          key={3}
          variant="neutral"
          onClick={() => paginationHandler(3)}
          className={`${currentPage === 3 ? "active" : ""} pagination__button`}
        >
          3
        </Button>
      );
    }

    //SUB: Add ellipses for left-side truncation
    if (currentPage > 4) {
      pages.push(
        <span key="left-ellipsis" className="pagination__ellipsis">
          ...
        </span>
      );
    }

    //SUB: Calculate the range of page numbers to display around the current page
    const startPage = Math.max(4, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant="neutral"
          onClick={() => paginationHandler(i)}
          className={`${currentPage === i ? "active" : ""} pagination__button`}
        >
          {i}
        </Button>
      );
    }

    //SUB: Add ellipses for right-side truncation
    if (currentPage < totalPages - 3) {
      pages.push(
        <span key="right-ellipsis" className="pagination__ellipsis">
          ...
        </span>
      );
    }

    //SUB: Always show the last two buttons
    if (totalPages > 3) {
      pages.push(
        <Button
          key={totalPages - 1}
          variant="neutral"
          onClick={() => paginationHandler(totalPages - 1)}
          className={`${
            currentPage === totalPages - 1 ? "active" : ""
          } pagination__button`}
        >
          {totalPages - 1}
        </Button>
      );

      pages.push(
        <Button
          key={totalPages}
          variant="neutral"
          onClick={() => paginationHandler(totalPages)}
          className={`${
            currentPage === totalPages ? "active" : ""
          } pagination__button`}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination__input">
        <span>Showing</span>
        <div className="pagination__select-wrapper">
          <CgChevronDown size={20} className="custom_arrow" />
          <select
            name="page_number"
            id="pageNumber"
            className="pagination__select"
            value={rowsperPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {filteredOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span>out of {dataLength}</span>
      </div>
      <div className="pagination__buttons">
        <Button
          className="pagination__button--nav"
          variant="neutral"
          onClick={() => paginationHandler(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="Prev"
        >
          <FaChevronLeft />
        </Button>

        {renderPageNumbers()}

        <Button
          variant="neutral"
          className="pagination__button--nav"
          onClick={() => paginationHandler(currentPage + 1)}
          disabled={currentPage === totalPages}
          data-testid="Next"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
