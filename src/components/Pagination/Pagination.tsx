import { usePagination, DOTS } from "../hooks/usePagination";
import styles from "./Pagination.module.css";

interface Pagination {
  onPageChange: (x: number) => void;
  siblingCount: number;
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Pagination): JSX.Element | null => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPageCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  //   let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.pagination_container}>
      {/* Left navigation arrow */}
      <li className={styles.pagination_item} onClick={onPrevious}>
        <div className={[styles.arrow, styles.left].join(" ")} />
      </li>

      {paginationRange?.map((pageNumber, id) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (typeof pageNumber === "string" && pageNumber === DOTS) {
          return (
            <li className={styles.dots} key={id}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={
              currentPage === pageNumber
                ? [styles.isActive, styles.pagination_item].join(" ")
                : styles.pagination_item
            }
            key={id}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className={styles.pagination_item} onClick={onNext}>
        <div className={[styles.arrow, styles.right].join(" ")} />
      </li>
    </ul>
  );
};

export default Pagination;
