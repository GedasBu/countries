import { usePagination, DOTS } from "../../hooks/usePagination";
import styles from "./Pagination.module.css";

interface PaginationElements {
  onPageChange: (number: number) => void;
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
}: PaginationElements): JSX.Element | null => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,

    totalPageCount,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    currentPage < totalPageCount
      ? onPageChange(currentPage + 1)
      : onPageChange(currentPage);
  };

  const onPrevious = () => {
    currentPage > 1 ? onPageChange(currentPage - 1) : onPageChange(currentPage);
  };

  return (
    <ul className={styles.pagination_container}>
      <li className={styles.pagination_item} onClick={onPrevious}>
        <div className={[styles.arrow, styles.left].join(" ")} />
      </li>

      {paginationRange?.map((pageNumber, id) => {
        if (typeof pageNumber === "string" && pageNumber === DOTS) {
          return (
            <li className={styles.dots} key={id}>
              &#8230;
            </li>
          );
        }
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
      <li className={styles.pagination_item} onClick={onNext}>
        <div className={[styles.arrow, styles.right].join(" ")} />
      </li>
    </ul>
  );
};

export default Pagination;
