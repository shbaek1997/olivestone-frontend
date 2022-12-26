import { useState } from "react";
//custom hook to set [value, setValue, onChangeHandler]
// onChangeHandler just setValue as e.target.value
const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, setValue, handler];
};

export default useInput;
