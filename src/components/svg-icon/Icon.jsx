import React from "react";

const Icon = ({
  iconName,
  width = "24",
  height = width,
  hover,
  fill,
  stroke,
  viewBox = "0 0 24 24",
  className = "",
}) => (
  <svg
    className={hover ? "icon icon-hover " : className}
    style={{ fill: fill, stroke: stroke }}
    width={width}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
  >
    <use xlinkHref={`/icons/sprites.svg#${iconName}`}></use>
  </svg>
);

export default Icon;
