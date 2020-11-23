import { createGlobalStyle } from "styled-components";

import InterBlackWOFF from "../assets/fonts/Inter/Inter-Black.woff";
import InterBlackWOFF2 from "../assets/fonts/Inter/Inter-Black.woff2";
import InterBlackItalicWOFF from "../assets/fonts/Inter/Inter-BlackItalic.woff";
import InterBlackItalicWOFF2 from "../assets/fonts/Inter/Inter-BlackItalic.woff2";
import InterBoldWOFF from "../assets/fonts/Inter/Inter-Bold.woff";
import InterBoldWOFF2 from "../assets/fonts/Inter/Inter-Bold.woff2";
import InterBoldItalicWOFF from "../assets/fonts/Inter/Inter-BoldItalic.woff";
import InterBoldItalicWOFF2 from "../assets/fonts/Inter/Inter-BoldItalic.woff2";
import InterExtraBoldWOFF from "../assets/fonts/Inter/Inter-ExtraBold.woff";
import InterExtraBoldWOFF2 from "../assets/fonts/Inter/Inter-ExtraBold.woff2";
import InterExtraLightWOFF from "../assets/fonts/Inter/Inter-ExtraLight.woff";
import InterExtraLightWOFF2 from "../assets/fonts/Inter/Inter-ExtraLight.woff2";
import InterItalicWOFF from "../assets/fonts/Inter/Inter-Italic.woff";
import InterItalicWOFF2 from "../assets/fonts/Inter/Inter-Italic.woff2";
import InterLightWOFF from "../assets/fonts/Inter/Inter-Light.woff";
import InterLightWOFF2 from "../assets/fonts/Inter/Inter-Light.woff2";
import InterMediumWOFF from "../assets/fonts/Inter/Inter-Medium.woff";
import InterMediumWOFF2 from "../assets/fonts/Inter/Inter-Medium.woff2";
import InterRegularWOFF from "../assets/fonts/Inter/Inter-Regular.woff";
import InterRegularWOFF2 from "../assets/fonts/Inter/Inter-Regular.woff2";
import InterSemiBoldWOFF from "../assets/fonts/Inter/Inter-SemiBold.woff";
import InterSemiBoldWOFF2 from "../assets/fonts/Inter/Inter-SemiBold.woff2";
import InterThinWOFF from "../assets/fonts/Inter/Inter-Thin.woff";
import InterThinWOFF2 from "../assets/fonts/Inter/Inter-Thin.woff2";

export const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 100;
  font-display: swap;
  src: url(${InterThinWOFF2}) format("woff2"),
       url(${InterThinWOFF}) format("woff");
}


@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 200;
  font-display: swap;
  src: url(${InterExtraLightWOFF2}) format("woff2"),
       url(${InterExtraLightWOFF}) format("woff");
}

@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 300;
  font-display: swap;
  src: url(${InterLightWOFF2}) format("woff2"),
       url(${InterLightWOFF}) format("woff");
}

@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 400;
  font-display: swap;
  src: url(${InterRegularWOFF2}) format("woff2"),
       url(${InterRegularWOFF}) format("woff");
}
@font-face {
  font-family: 'Inter';
  font-style:  italic;
  font-weight: 400;
  font-display: swap;
  src: url(${InterItalicWOFF2}) format("woff2"),
       url(${InterItalicWOFF}) format("woff");
}

@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 500;
  font-display: swap;
  src: url(${InterMediumWOFF2}) format("woff2"),
       url(${InterMediumWOFF}) format("woff");
}


@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 600;
  font-display: swap;
  src: url(${InterSemiBoldWOFF2}) format("woff2"),
       url(${InterSemiBoldWOFF}) format("woff");
}

@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 700;
  font-display: swap;
  src: url(${InterBoldWOFF2}) format("woff2"),
       url(${InterBoldWOFF}) format("woff");
}

@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 800;
  font-display: swap;
  src: url(${InterExtraBoldWOFF2}) format("woff2"),
       url(${InterExtraBoldWOFF}) format("woff");
}


@font-face {
  font-family: 'Inter';
  font-style:  normal;
  font-weight: 900;
  font-display: swap;
  src: url(${InterBlackWOFF2}) format("woff2"),
       url(${InterBlackWOFF}) format("woff");
}






  html, body {
    padding: 0;
    margin: 0;
  }

  
`;
