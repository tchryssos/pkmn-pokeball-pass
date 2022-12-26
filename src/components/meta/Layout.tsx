import { AppShell, Container } from '@mantine/core';

import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <>
    <Head title={title} />
    <AppShell padding="lg">
      <Container px={0} size={1200}>
        {children}
      </Container>
    </AppShell>
  </>
);
