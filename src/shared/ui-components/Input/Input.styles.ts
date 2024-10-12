import styled from 'styled-components';
import { InputProps } from 'src/shared/ui-components/Input';
import { getColor } from '../../theme';

type StyledInputProps = InputProps & {
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
};

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${getColor('gray', 'light', 300)};
  border-radius: 4px;
  font-size: 1rem;
  color: ${getColor('gray', 'dark')};
  background-color: ${getColor('white')};
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${getColor('primary')};
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case 'filled':
        return `
          background-color: ${getColor('gray', theme, 100)};
          border: none;
        `;
      default:
        return `
          background-color: ${getColor('white')};
          border: 1px solid ${getColor('gray', 'light', 300)};
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'font-size: 0.875rem; padding: 0.75rem 1rem;';
      case 'lg':
        return 'font-size: 1.125rem; padding: 1.25rem 2rem;';
      default:
        return 'font-size: 1rem; padding: 1rem;';
    }
  }}

  ${({ disabled }) =>
    disabled
      ? `
          opacity: 0.5;
          cursor: not-allowed;
          background-color: ${getColor('gray', 'light', 200)};
        `
      : ''
  }
`;