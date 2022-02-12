import { useQuery } from "react-query";
import { getCountries } from "../../api/countries/countries";
import CountryCard from "./CountryCard";
import styles from "./CountriesListContainer.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { useState, useMemo, useEffect } from "react";
import Sort from "../../components/Sort/Sort";
import { Countries } from "../../api/countries/types";
import Filter from "../../components/Filter/Filter";

const CountriesListContainer = (): JSX.Element => {
  const { data } = useQuery("countries", () => getCountries());
  const [countries, setCountries] = useState<Countries[]>(data ? data : []);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  const sortHandler = (value: string) => {
    const sortArray = [...countries];
    if (value === "asc") {
      sortArray?.sort((a, b) => (a.name < b.name ? -1 : 1));
    } else {
      sortArray?.sort((a, b) => (b.name < a.name ? -1 : 1));
    }
    setCountries(sortArray);
  };

  const filterHandler = (value: string) => {
    const filterArray = (data?[...data]:[]);
    if (value === "<lt") {
      const filteredArray = filterArray.filter(function (country) {
        return country.area < 65300;
      });
      setCountries(filteredArray);
    } else {
      
      const filteredArray = filterArray.filter(function (country) {
        return (country.region === "Oceania");
      });
      setCountries(filteredArray);
    }
  };

  const resetHandler = ()=>{
    setCountries(data?data:[]);
  }

  const countriesTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return countries?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, countries]);

  return (
    <div className={styles.container}>
      <div className={styles.sortFilterContainer}>
        <div>
          <Sort onChange={sortHandler} />
        </div>
        <div>
          <Filter onChange={filterHandler} />
        </div>
        <button onClick = {resetHandler}>
          Reset
        </button>
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
          totalCount={data?.length || 0}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CountriesListContainer;
