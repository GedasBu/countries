import { useQuery } from "react-query";
import { getCountries } from "../../api/countries/countries";
import CountryCard from "./CountryCard";
import styles from "./CountriesListContainer.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useState, useMemo, useEffect } from "react";
import Sort from "../../components/Sort/Sort";
import { Countries } from "../../api/countries/types";
import Filter from "../../components/Filter/Filter";
import { sortOptions, filterOptions } from "../../constants/constants";

const CountriesListContainer = (): JSX.Element => {
  const { data } = useQuery("countries", () => getCountries());
  const [countries, setCountries] = useState<Countries[]>(data ? data : []);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const pageSize = 10;

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  const sortHandler = (value: string | undefined) => {
    setSortValue(value || "");
    const sortArray = [...countries];
    if (value === sortOptions.asc) {
      sortArray?.sort(function (a, b) {
        return a.name.localeCompare(b.name, "en-Latn-US");
      });
    } else {
      sortArray?.sort(function (a, b) {
        return b.name.localeCompare(a.name, "en-Latn-US");
      });
    }
    setCountries(sortArray);
  };

  const filterHandler = (value: string | undefined) => {
    setFilterValue(value || "");
    const filterArray = data ? [...data] : [];
    if (value === filterOptions.smallerLT) {
      const filteredArray = filterArray.filter(function (country) {
        return country.area < 65300;
      });
      setCountries(filteredArray);
    } else {
      const filteredArray = filterArray.filter(function (country) {
        return country.region === filterOptions.oceania;
      });
      setCountries(filteredArray);
    }
  };

  const resetHandler = () => {
    setCountries(data ? data : []);
    setFilterValue("");
    setSortValue("");
  };

  const countriesTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return countries?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, countries]);

  return (
    <div className={styles.container}>
      <div className={styles.sortFilterContainer}>
        <div>
          <Sort onChange={sortHandler} value={sortValue} />
        </div>
        <div>
          <Filter onChange={filterHandler} value={filterValue} />
        </div>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <div>
        {countriesTableData?.map((country) => (
          <CountryCard key={country.name} {...country} />
        ))}
      </div>
      <div>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          siblingCount={1}
          totalCount={countries.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CountriesListContainer;
