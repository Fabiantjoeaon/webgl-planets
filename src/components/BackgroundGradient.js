import React, { memo } from "react";
import styled from "styled-components";
import { animated as a } from "react-spring";

export function BackgroundGradient({ width, height }) {
  return (
    <Gradient>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        w={width}
        h={height}
      >
        <defs>
          <a.linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* TODO: Animating offset can also be very nice */}
            <a.stop stopColor={"#242424"} offset="0%" />
            <a.stop stopColor={"#242424"} offset="100%" />
          </a.linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#gradient)" />
      </svg>
    </Gradient>
  );
}

const Gradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
  }
`;
