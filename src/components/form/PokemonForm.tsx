import { FormEvent, useRef, useState } from 'react';

import { SubmitButton } from '../buttons/SubmitButton';
import { Form } from './Form';
import { Input } from './Input';

enum PokemonFormFields {
  pkmnOne = 'pokemonOne',
  pkmnTwo = 'pokemonTwo',
}

type PokemonSubmitData = {
  [PokemonFormFields.pkmnOne]: string;
  [PokemonFormFields.pkmnTwo]: string;
};

interface PokemonFormProps {
  onSubmit: (e: FormEvent) => Promise<void> | void;
}
export const PokemonForm: React.FC<PokemonFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAutocomplete, setActiveAutocomplete] = useState<
    PokemonFormFields | undefined
  >();

  const formRef = useRef<HTMLFormElement>(null);

  const _onSubmit = async (e: FormEvent) => {
    setIsSubmitting(true);
    await onSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <Form formRef={formRef} onSubmit={_onSubmit}>
      <Input<PokemonSubmitData>
        activeAutocomplete={activeAutocomplete}
        label="Ball Holder"
        name={PokemonFormFields.pkmnOne}
        required
        onBlur={() => setActiveAutocomplete(undefined)}
        onFocus={() => setActiveAutocomplete(PokemonFormFields.pkmnOne)}
      />
      <Input<PokemonSubmitData>
        activeAutocomplete={activeAutocomplete}
        label="Ball Receiver"
        name={PokemonFormFields.pkmnTwo}
        required
        onBlur={() => setActiveAutocomplete(undefined)}
        onFocus={() => setActiveAutocomplete(PokemonFormFields.pkmnTwo)}
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </Form>
  );
};
