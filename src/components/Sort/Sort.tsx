import Select, { OnChangeValue, StylesConfig } from "react-select";

type Option = {
  value: string;
  label: string;
};

type SortProps = {
  onChange: (value: string | undefined) => void;
  value: string;
};

const Sort = ({ onChange, value }: SortProps): JSX.Element => {
  const options = [
    { value: "asc", label: "Name ASC" },
    { value: "dsc", label: "Name DESC" },
  ];

  const setSort = (value: OnChangeValue<Option, false>) => {
    onChange(value?.value);
  };

  const customStyles: StylesConfig<Option, false> = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    control: (provided) => ({
      ...provided,
      width: 150,
      backgroundColor: "var(--button)",
      boxShadow: "none",
      border: 0,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div>
      <Select
        placeholder={"Sort..."}
        onChange={setSort}
        options={options}
        styles={customStyles}
        value={options.find((option) => option.value === value) || null}
      />
    </div>
  );
};

export default Sort;
