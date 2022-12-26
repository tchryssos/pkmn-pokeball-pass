import { css, Global, Theme, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import type { AppProps /* , AppContext */ } from 'next/app';
import { useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseTheme } from '~/constants/theme';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { BreakpointSize } from '~/typings/breakpoints';

const marPadZero = css`
  margin: 0;
  padding: 0;
`;

const baseStyle = css`
  height: 100%;
  width: 100%;
  ${marPadZero};
`;

const createGlobalStyles = (theme: Theme) => css`
  /* @import url(''); */
  html {
    ${baseStyle};
  }
  body {
    ${baseStyle};
    position: relative;
    box-sizing: border-box;
    font-family: ${theme.fontFamily.base};
  }
  #app,
  #__next {
    ${baseStyle};
  }
  div,
  input,
  select,
  textarea {
    box-sizing: border-box;
  }
  p {
    ${marPadZero};
  }
  h1 {
    ${marPadZero};
  }
  h2 {
    ${marPadZero};
  }
  h3 {
    ${marPadZero};
  }
`;

const GlobalWrapper = styled(FlexBox)`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const Page: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [windowBreakpoints, setWindowBreakpoints] = useState<BreakpointSize[]>([
    'xxs',
  ]);
  const theme = BaseTheme;

  useEffect(() => {
    Object.keys(theme.breakpointValues).forEach((key, i, arr) => {
      const queryAdjective = key === 'xss' ? 'max' : 'min';
      const query = window.matchMedia(
        `(${queryAdjective}-width: ${
          theme.breakpointValues[key as BreakpointSize]
        }px)`
      );
      if (query.matches) {
        setWindowBreakpoints(arr.slice(0, i + 1) as BreakpointSize[]);
      }
      query.addEventListener('change', (e) => {
        setWindowBreakpoints(
          arr.slice(0, e.matches ? i + 1 : i) as BreakpointSize[]
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BreakpointsContext.Provider value={windowBreakpoints}>
        <GlobalWrapper>
          <Global styles={createGlobalStyles(theme)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </GlobalWrapper>
      </BreakpointsContext.Provider>
    </ThemeProvider>
  );
};

export default Page;
