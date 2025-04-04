
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

