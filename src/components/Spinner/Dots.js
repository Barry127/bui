import React from 'react';

const Dots = () => (
  <svg viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(1, 1)">
      <circle cx="5" cy="50" r="5">
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          values="50;5;50;50"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          begin="0s"
          dur="2.2s"
          values="5;27;49;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="27" cy="5" r="5">
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          values="5;50;50;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          begin="0s"
          dur="2.2s"
          values="27;49;5;27"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="49" cy="50" r="5">
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          values="50;50;5;50"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          begin="0s"
          dur="2.2s"
          values="49;5;27;49"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export default Dots;