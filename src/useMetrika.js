import { useContext } from "react";
import { Context } from "./Context";

const useMetrika = () => {
  const { reduce } = useContext(Context);

  return (method, ...values) => {
    reduce({
      type: "STACK_ADD",
      payload: {
        method,
        values,
      },
    });
  };
};

export default useMetrika;
