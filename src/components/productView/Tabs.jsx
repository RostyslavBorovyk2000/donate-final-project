/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import styles from "./ProductView.module.scss";


function TabComponent({ productDescription }) {
  return (
    <>
      <div className={styles.tabs}>
        <div className={styles.descriptionTab}>
          <div className={styles.activeTab}>
            Детальний опис
          </div>
        </div>
      </div>
      <div className={styles.tabContent}>
        <div>{productDescription}</div>
      </div>
    </>
  );
}

export default TabComponent;

TabComponent.propTypes = {
  productDescription: PropTypes.string.isRequired,
};
