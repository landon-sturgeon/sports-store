import { useNavigate } from "react-router-dom";

export const historyWrapper = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};
