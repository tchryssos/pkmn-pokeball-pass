import { Autocomplete, Button, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

enum PkmnFields {
  pkmnOne = 'pkmnOne',
  pkmnTwo = 'pkmnTwo',
}

export const PkmnForm: React.FC = () => {
  const [pkmnAutocompleteList, setPkmnAutocompleteList] = useState<string[]>(
    []
  );
  const mantineForm = useForm({
    initialValues: {
      [PkmnFields.pkmnOne]: '',
      [PkmnFields.pkmnTwo]: '',
    },
  });

  return (
    // eslint-disable-next-line no-console
    <form onSubmit={mantineForm.onSubmit((values) => console.log(values))}>
      <Grid>
        <Grid.Col span={6}>
          <Autocomplete
            data={pkmnAutocompleteList}
            label="Ball holder"
            {...mantineForm.getInputProps(PkmnFields.pkmnOne)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Autocomplete
            data={pkmnAutocompleteList}
            label="Ball receiver"
            {...mantineForm.getInputProps(PkmnFields.pkmnTwo)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Button type="submit">Submit</Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};
