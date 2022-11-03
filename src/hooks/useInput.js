import { useState } from "react";

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, setValue, handler];
};

export default useInput;
