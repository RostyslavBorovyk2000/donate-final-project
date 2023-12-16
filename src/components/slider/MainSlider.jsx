/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import picOne from "../../images/bet-on-victory-1.jpeg";
import picTwo from "../../images/bet-on-victory-2.jpeg";
import picThree from "../../images/bet-on-victory-3.jpeg";
import styles from "./MainSlider.module.scss";


function MainSlider() {
  const [currentPic, setCurrentPic] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPic((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const pictures = [picOne, picTwo, picThree];

  return (
    <section className={styles.section}>
      <Link
        to={
        // eslint-disable-next-line no-nested-ternary
        currentPic === 0 ? "/product/3456726" : currentPic === 1 ? "/product/547790" : currentPic === 2 ? "/product/111644" : null
      }
        className={styles.mainPiсture}
      >
        <img src={pictures[currentPic]} alt="alt" />
      </Link>
      
      <div className={styles.imageswrapper}>
        <div className={styles.images}>
          <img
            src={picOne}
            alt="alt"
            onClick={() => setCurrentPic(0)}
            className={
            currentPic === 0 ? styles.image : styles.secondPlaneImage
          }
          />
          <img
            src={picTwo}
            alt="alt"
            onClick={() => setCurrentPic(1)}
            className={
            currentPic === 1 ? styles.image : styles.secondPlaneImage
          }
          />
          <img
            src={picThree}
            alt="alt"
            onClick={() => setCurrentPic(2)}
            className={
            currentPic === 2 ? styles.image : styles.secondPlaneImage
          }
          />
        </div>
      </div>
    </section>
  );
}

export default MainSlider;
