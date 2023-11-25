import React from "react";
import {
  Formik, Form, Field, ErrorMessage,
} from "formik";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DocumentTitle from "../DocumentTitle";
import styles from "../../footer/Footer.module.scss";
import { Facebook } from "../../footer/icons/facebook/Facebook";
import { Instagram } from "../../footer/icons/instagram/Instagram";
import { Twitter } from "../../footer/icons/twitter/Twitter";
import { Linkedin } from "../../footer/icons/linkedin/LinkedIn";
import { Youtube } from "../../footer/icons/youtube/Youtube";
import style from "./Contacts.module.scss";
import logo from "../../footer/icons/logo.png";
import Button from "../../button/Button";

export function ContactMap() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 50.4501, // Широта (Київ)
    lng: 30.5234, // Довгота (Київ)
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDzYMkwgH4SZybsi_2DWSZjabQAFLskmNE">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export function ContactForm() {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          margin: "0 0 24px",
          textTransform: "uppercase",
        }}
      >
        Форма звернення
      </h2>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Поле є обов'язковим";
          }
          if (!values.email) {
            errors.email = "Поле є обов'язковим";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Некоректний емейл";
          }
          if (!values.message) {
            errors.message = "Поле є обов'язковим";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={style.contactFieldWrapper}>
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              {" "}
              Ваше Ім&apos;я:
            </p>
            <Field
              type="text"
              id="name"
              name="name"
              className={style.inputForm}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={style.errorMessage}
            />
          </div>

          <div className={style.contactFieldWrapper}>
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              Ваш Email:
            </p>
            <Field
              type="email"
              id="email"
              name="email"
              className={style.inputForm}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={style.errorMessage}
            />
          </div>

          <div className={style.contactFieldWrapper}>
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              Ваше повідомлення:
            </p>
            <Field
              as="textarea"
              id="message"
              name="message"
              className={style.textareaForm}
            />
            <ErrorMessage
              name="message"
              component="div"
              className={style.errorMessage}
            />
          </div>

          <Button>
            Надіслати
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  margin: "0",
  background: "#f3f3f3",
  padding: "40px",
};

function Contacts() {
  return (
    <>
      <DocumentTitle title="Контакти" />
      <h1
        style={{
          fontSize: "30px", marginTop: "10px", color: "#7c8d66", textTransform: "uppercase",
        }}
      >
        Контакти
      </h1>
      <p style={{ color: "rgb(61 61 61)", marginBottom: "10px" }}>Контактна інформація</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          padding: "0",
          marginBottom: "24px",
        }}
      >
        <div style={containerStyle}>
          {" "}
          <div style={{ padding: "0", margin: "0 0 40px" }}>
            <a style={{ fontSize: "28px", color: "#7c8d66" }} href="/">
              <img src={logo} alt="logo" />
            </a>
            <p style={{ marginLeft: "10px" }}>м.Київ, Україна</p>
          </div>
          <div style={{ padding: "0", margin: "0 0 40px 10px" }}>
            <p>Телефон</p>
            <div>
              <a
                href="tel: +38 099 999-19-99"
                style={{ fontSize: "28px", color: "#7c8d66" }}
              >
                {" "}
                +38 099 999-19-99
                {" "}
              </a>
            </div>
          </div>
          <div style={{ padding: "0", margin: "0 0 40px 10px" }}>
            <p>Соціальні мережі</p>
            <li style={{ display: "inline-flex", marginTop: " 16px" }}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.bottomSocialLink}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #7c8d66",
                }}
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.bottomSocialLink}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #7c8d66",
                }}
              >
                <Instagram />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.bottomSocialLink}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #7c8d66",
                }}
              >
                <Twitter />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.bottomSocialLink}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #7c8d66",
                }}
              >
                <Linkedin />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.bottomSocialLink}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #7c8d66",
                }}
              >
                <Youtube />
              </a>
            </li>
          </div>
        </div>
        <div style={containerStyle}>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <div>
        <ContactMap />
      </div>
    </>
  );
}

export default Contacts;