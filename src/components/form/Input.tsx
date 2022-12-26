import styled from '@emotion/styled';
import { FocusEventHandler, useEffect, useState } from 'react';

import { FlexBox } from '../box/FlexBox';
import { Body } from '../typography/Body';
import { AutoComplete } from './Autocomplete';
import { createInputStyles } from './styles';

export type InputProps<T extends Record<string, unknown>> = {
  name: Extract<keyof T, string>;
  label: string;
  required?: boolean;
  className?: string;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  error?: string;
  activeAutocomplete?: string;
};

const InputWrapper = styled(FlexBox)`
  width: 100%;
`;

const StyledInput = styled.input<{ error: boolean }>`
  ${({ theme }) => createInputStyles(theme)};
  width: 100%;
  border-color: ${({ error, theme }) =>
    error ? theme.colors.danger : theme.colors.accentHeavy};
`;

const Error = styled(Body)(({ theme }) => ({
  color: theme.colors.danger,
  fontSize: theme.fontSize[14],
  marginTop: theme.spacing[4],
}));

const Label = styled.label(({ theme }) => ({
  fontSize: theme.fontSize[14],
  fontWeight: theme.fontWeight.regular,
}));

export function Input<T extends Record<string, unknown>>(props: InputProps<T>) {
  const {
    name,
    className,
    required,
    label,
    onBlur,
    activeAutocomplete,
    error,
  } = props;

  const [value, setValue] = useState('');
  const [activeDescendant, setActiveDescendant] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(
    Boolean(activeAutocomplete === name)
  );
  const [autoCompleteList, setAutoCompleteList] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    setShowAutoComplete(Boolean(activeAutocomplete === name));
  }, [activeAutocomplete, name]);

  return (
    <InputWrapper className={className} column>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        aria-activedescendant={activeDescendant}
        aria-autocomplete={autoCompleteList ? 'list' : 'none'}
        error={Boolean(error)}
        name={name}
        required={required}
        type="autocomplete"
        value={value}
        onBlur={onBlur}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {error && <Error>{error}</Error>}
      {showAutoComplete && autoCompleteList && (
        <AutoComplete
          inputValue={value}
          itemList={autoCompleteList}
          setActiveDescendant={setActiveDescendant}
          setInputValue={setValue}
          setShowAutoComplete={setShowAutoComplete}
        />
      )}
    </InputWrapper>
  );
}
