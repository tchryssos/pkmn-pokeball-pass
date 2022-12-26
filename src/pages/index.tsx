import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';

const Home: React.FC = () => (
  <Layout>
    <Title>Pokémon Pokéball Breeding</Title>
    <Body>
      Choose a starting pokémon in a pokéball you want to pass to an ending
      pokémon, and we&apos;ll show you the breeding chain to get there.
    </Body>
    <Body>
      See{' '}
      <Link
        href="https://www.reddit.com/r/pokemon/comments/5gvlat/found_this_pokeball_inheritance_chart_online/"
        isInternal={false}
      >
        pokéball inheritance
      </Link>{' '}
      for more info.
    </Body>
  </Layout>
);

export default Home;
