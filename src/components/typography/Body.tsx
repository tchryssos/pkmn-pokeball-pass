import styled from '@emotion/styled';

import { MarginProps } from '../box/types';
import { createTextSharedStyles } from './styles';
import { TypographyProps } from './types';

type BodyProps = Pick<MarginProps, 'mb'> & TypographyProps;

export const Body = styled.p<BodyProps>`
  ${({ theme, variant = 'base', ...rest }) =>
    createTextSharedStyles(theme, { ...rest, variant })}
  font-size: ${({ theme }) => theme.fontSize[16]};
`;
