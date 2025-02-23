// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import PropTypes from "prop-types";

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen">{children}</div>
//       <Footer />
//     </>
//   );
// };

// export default Layout;

import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

// ✅ Add PropTypes Validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

