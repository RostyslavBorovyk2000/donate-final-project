import React from "react";
import { Link } from "react-router-dom";
import logo from "./icons/logo.png";
import { Location } from "./icons/location/Location";
import { Message } from "./icons/message/Message";
import { Call } from "./icons/call/Call";
import { Facebook } from "./icons/facebook/Facebook";
import { Instagram } from "./icons/instagram/Instagram";
import { Twitter } from "./icons/twitter/Twitter";
import { Linkedin } from "./icons/linkedin/LinkedIn";
import { Youtube } from "./icons/youtube/Youtube";
import { ReactComponent as PaypalIcon } from "./icons/paymentMethods/paypal.svg";
import { ReactComponent as MastercardIcon } from "./icons/paymentMethods/mastercard.svg";
import { ReactComponent as VisaIcon } from "./icons/paymentMethods/visa.svg";
import { ReactComponent as LiqpayIcon } from "./icons/paymentMethods/liqpay.svg";
import { Pagination } from "../pagination/Pagination";
import FooterAccordion from "./FooterAccordion";
import Subscribe from "./Subscribe";
import styles from "./Footer.module.scss";

function Footer() {
  const menuItems = [
    {
      title: "Клієнтам",
      items: [
        { label: "Вхід до кабінету", link: "/log-in" },
        { label: "Про нас", link: "/about-us" },
        { label: "Доставка та оплата", link: "/delivery-payment" },
        { label: "Обмін та повернення", link: "/returns" },
        { label: "Контакти", link: "/contacts" },
      ],
      id: 1,
    },
    {
      title: "Інформація",
      items: [
        { label: "Політика конфіденційності", link: "/privacy-policy" },
        { label: "Новини", link: "/blog" },
      ],
      id: 2,
    },
    {
      title: "Категорії",
      items: [
        { label: "Військовий одяг", link: "/categories/military-clothing" },
        { label: "Лоти", link: "/categories/charity-auction" },
        { label: "Донати", link: "/categories/donation" },
      ],
      id: 3,
    },
  ];
  return (
    <footer data-testid="footer-svg-test" className={styles.footer}>
      <div className={styles.footerContainer}>
        <Subscribe />

        <div className={styles.footerContacts}>
          <div className={styles.contactsContainer}>
            <div className={styles.contactsInner}>
              <ul className={styles.contactsList}>
                <li className={styles.contactsItem}>
                  <Link to="/">
                    <img src={logo} alt="Logo" />
                  </Link>
                </li>

                <li className={styles.contactsItem}>
                  <Location />
                  <a href="/">Київ, Україна</a>
                </li>
                <li className={styles.contactsItem}>
                  <Message />
                  <a href="mailto:contact@donate.com">contact@donate.com</a>
                </li>
                <li className={styles.contactsItem}>
                  <Call />
                  <a href="tel: +38 099 999-19-99">+38 099 999-19-99</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.accordionMenuMobile}>
          {menuItems.map((item) => (
            // eslint-disable-next-line react/no-array-index-key
            <FooterAccordion
              key={item.id}
              title={item.title}
              items={item.items}
            />
          ))}
        </div>
        <div className={styles.footerNavigationContainer}>
          <div className={styles.bottomInner}>
            <nav className={styles.bottomItem}>
              <h4 className={styles.bottomTitle}>Клієнтам</h4>
              <ul className={styles.bottomList}>
                <li className={styles.bottomListItem}>
                  <Link to="/log-in" className={styles.bottomLink}>
                    Вхід до кабінету
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/about-us" className={styles.bottomLink}>
                    Про нас
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/delivery-payment" className={styles.bottomLink}>
                    Доставка та оплата
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/returns" className={styles.bottomLink}>
                    Обмін та повернення
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/contacts" className={styles.bottomLink}>
                    Контакти
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className={styles.bottomItem}>
              <h4 className={styles.bottomTitle}>Інформація</h4>
              <ul className={styles.bottomList}>
                <li className={styles.bottomListItem}>
                  <Link to="/privacy-policy" className={styles.bottomLink}>
                    Політика конфіденційності
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/blog" className={styles.bottomLink}>
                    Новини
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className={styles.bottomItem}>
              <h4 className={styles.bottomTitle}>Категорії</h4>
              <ul className={styles.bottomList}>
                <li className={styles.bottomListItem}>
                  <Link
                    to="/categories/military-clothing"
                    className={styles.bottomLink}
                  >
                    Військовий одяг
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link
                    to="/categories/charity-auction"
                    className={styles.bottomLink}
                  >
                    Лоти
                  </Link>
                </li>
                <li className={styles.bottomListItem}>
                  <Link to="/categories/donation" className={styles.bottomLink}>
                    Донати
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={styles.bottomItem}>
              <h4 className={styles.bottomTitle}>Соціальні мережі</h4>
              <div className={styles.bottomSocialMedia}>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bottomSocialLink}
                >
                  <Facebook />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bottomSocialLink}
                >
                  <Instagram />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bottomSocialLink}
                >
                  <Twitter />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bottomSocialLink}
                >
                  <Linkedin />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bottomSocialLink}
                >
                  <Youtube />
                </a>
              </div>
              <div className={styles.bottomPaymentMethods}>
                {/* <a href="https://paypal.com/ua/home">
                  <PaypalIcon />
                </a>
                <a href="#1">
                  <MastercardIcon />
                </a>
                <a href="#1">
                  <VisaIcon />
                </a>
                <a href="#1">
                  <LiqpayIcon />
                </a> */}
                <PaypalIcon />
                <MastercardIcon />
                <VisaIcon />
                <LiqpayIcon />
              </div>
            </div>
          </div>
        </div>
        <p className={styles.rightsReserved}>
          © 2023 ДонатПеремоги. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
