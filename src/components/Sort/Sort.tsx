import Select, { OnChangeValue } from "react-select";

type Option = {
  value: string;
  label: string;
};

const Sort = ({ onChange }: any) => {
  const options = [
    { value: "asc", label: "Name ASC" },
    { value: "dsc", label: "Name DESC" },
  ];

  const setSort = (value: OnChangeValue<Option, false>) => {
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
      width: 150,
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
    <div>
      <Select
        placeholder={"Sort..."}
        onChange={setSort}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};

export default Sort;
