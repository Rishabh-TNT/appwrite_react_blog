function Select({ lable, options = [] }) {
  return (
    <select label="Status : ">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
