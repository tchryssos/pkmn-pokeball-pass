import { css } from '@emotion/react';

import { Theme } from '~/constants/theme';

export const createInputStyles = (theme: Theme) =>
  css({
    padding: theme.spacing[16],
    fontSize: theme.fontSize[16],
    fontFamily: theme.fontFamily.base,
    fontWeight: theme.fontWeight.light,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    border: `${theme.borderWidth[1]} solid ${theme.colors.accentHeavy}`,
  });
