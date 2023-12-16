import { useEffect } from "react";
import PropTypes from "prop-types";


export default function DocumentTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
