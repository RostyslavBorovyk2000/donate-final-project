import React from "react";
import PropTypes from "prop-types";


const containerStyle = {
  marginTop: "10px",
  marginBottom: "20px",
  border: "1px solid #7c8d66",
  borderRadius: "12px",
  background: "#ededed",
  width: "100%",
  height: "24px",
};

const contentStyle = {
  background: "#7c8d66",
  height: "100%",
  textAlign: "center",
  lineHeight: "24px",
  fontFamily: "sans-serif",
  transition: "0.3s",
  color: "white",
  borderRadius: "12px",

};

export function ProgressBar({ progress }) {
  const state = `${progress}%`;
  return (
    <div style={containerStyle}>
      <div style={{ ...contentStyle, width: state }}>
        {progress >= 0 ? state : ""}
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.string.isRequired,
};
