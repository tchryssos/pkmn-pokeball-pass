import styled from '@emotion/styled';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  isInternal?: boolean;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

interface StyledProps extends Pick<LinkProps, 'underline'> {}

const StyledLink = styled.a<StyledProps>`
  color: ${({ theme }) => theme.colors.text};
  display: inline-block;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  :hover {
    color: ${({ theme }) => theme.colors.textAccent};
  }
`;

export const Link: React.FC<LinkProps> = ({
  href,
  isInternal = true,
  children,
  className,
  underline = true,
}) => (
  <NextLink href={href} passHref>
    <StyledLink
      className={className}
      rel="noopener noreferrer"
      target={isInternal ? '_self' : '_blank'}
      underline={underline}
    >
      {children}
    </StyledLink>
  </NextLink>
);
