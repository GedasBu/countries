import Select, { OnChangeValue } from "react-select";

import styles from "./Filter.module.css";

type Option = {
  value: string;
  label: string;
};

const Filter = ({ onChange }: any) => {
  const options = [
    { value: "<lt", label: "Smaller than LT" },
    { value: "ocean", label: "Region Oceania" },
  ];

  const setFilter = (value: OnChangeValue<Option, false>) => {
    onChange(value?.value);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: "black",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      width: 170,
      backgroundColor: "lightgreen",
      boxShadow: "none",
      border: 0,
    }),

    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div className={styles.filterContainer}>
      <Select placeholder={"Filter..."} onChange={setFilter} options={options} styles={customStyles} />
    </div>
  );
};

export default Filter;
