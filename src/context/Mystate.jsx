import { useState } from "react";
import Mycontext from "./Mycontext";
import PropTypes from "prop-types";

function Mystate(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }

    // Add smooth transition effect
    document.body.style.transition = "background-color 0.3s ease-in-out";
  };

  return (
    <Mycontext.Provider value={{ mode, toggleMode }}>
      {props.children}
    </Mycontext.Provider>
  );
}
Mystate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Mystate;
