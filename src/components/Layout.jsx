
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


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

