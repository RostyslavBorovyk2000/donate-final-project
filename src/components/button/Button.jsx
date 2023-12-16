import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";


export default function Button({
  text = "", color = "#7c8d66", padding = "", width = "150px", toPage = "", onClick = null, children, ...rest
}) {
  const buttonStyle = {
    backgroundColor: color,
    width,
    padding,
  };

  return (
    // eslint-disable-next-line max-len
    <Link to={toPage} style={buttonStyle} className={styles.buttonStyle} onClick={onClick} {...rest}>
      {
         text !== "" ? text : children
        }
    </Link>

  );
}


export function FormButton({
  text = "", type = null, color = "#7c8d66", padding = "", width = "150px", onClick = null, children, ...rest
}) {
  const buttonStyle = {
    backgroundColor: color,
    width,
    padding,
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    // eslint-disable-next-line max-len, react/button-has-type
    <button type={type} style={buttonStyle} className={styles.buttonStyle} onClick={onClick} {...rest} onKeyDown={handleKeyDown}>
      {
         text !== "" ? text : children
        }
    </button>

  );
}


Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  toPage: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

FormButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};
