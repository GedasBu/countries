import Select, { OnChangeValue, StylesConfig } from "react-select";

type Option = {
  value: string;
  label: string;
};
type FilterProps = {
  onChange: (value: string | undefined) => void;
  value: string;
};

const Filter = ({ onChange, value }: FilterProps): JSX.Element => {
  const options = [
    { value: "<lt", label: "Smaller than LT" },
    { value: "ocean", label: "Region Oceania" },
  ];

  const setFilter = (value: OnChangeValue<Option, false>) => {
    onChange(value?.value);
  };

  const customStyles: StylesConfig<Option, false> = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    control: (provided) => ({
      ...provided,
      width: 170,
      backgroundColor: "var(--button)",
      boxShadow: "none",
      border: 0,
      marginLeft: 10,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <Select
      placeholder={"Filter..."}
      onChange={setFilter}
      options={options}
      styles={customStyles}
      value={options.find((option) => option.value === value) || null}
    />
  );
};

export default Filter;
