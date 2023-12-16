import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";


function ActiveLink({ label, to, className }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={{ color: isActive ? "#5d640b" : null }} className={className} onClick={null}>
      {label}
    </Link>
  );
}

export default ActiveLink;

ActiveLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};
