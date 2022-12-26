import { Text, Title } from '@mantine/core';
import { useState } from 'react';

// import { PokemonForm } from '~/components/form/PokemonForm';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';

type BreedingChain = unknown[];

const Home: React.FC = () => {
  const [chain, setChain] = useState<BreedingChain | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('submit');
  };

  return (
    <Layout>
      <Title order={1}>Pokémon Pokéball Breeding</Title>
      <Text>
        Choose a starting pokémon in a pokéball you want to pass to an ending
        pokémon, and we&apos;ll show you the breeding chain to get there.
      </Text>
      <Text>
        See{' '}
        <Link
          href="https://www.reddit.com/r/pokemon/comments/5gvlat/found_this_pokeball_inheritance_chart_online/"
          isInternal={false}
        >
          pokéball inheritance
        </Link>{' '}
        for more info.
      </Text>
      {/* <PokemonForm onSubmit={onSubmit} /> */}
    </Layout>
  );
};

export default Home;
