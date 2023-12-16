/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import downArrow from "./icons/down_arrow.svg";
import styles from "./Footer.module.scss";


function FooterAccordion({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.bottomMobileItem}>
      <h4 className={styles.bottomTitle} onClick={handleToggle}>
        {title}
        {" "}
        <img className={styles.arrowDown} src={downArrow} alt="Arrow Down" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} width="20px" />
      </h4>
      {isOpen && (
      <ul className={styles.bottomList}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={styles.bottomListItem} key={index}>
            <Link to={item.link} className={styles.bottomLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      )}
    </nav>
  );
}

export default FooterAccordion;

FooterAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
