import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

const Page: React.FC<AppProps> = ({ Component, pageProps }) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </MantineProvider>
);

export default Page;
