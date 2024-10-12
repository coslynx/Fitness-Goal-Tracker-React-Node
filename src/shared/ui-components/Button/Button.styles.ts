import styled from 'styled-components';
import { ButtonProps } from '../Button';
import { getColor } from '../../theme';

type StyledButtonProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ variant, theme, disabled }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${getColor('primary', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('primary', theme, 0.9)};
          }
        `;
      case 'secondary':
        return `
          background-color: ${getColor('secondary', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('secondary', theme, 0.9)};
          }
        `;
      case 'danger':
        return `
          background-color: ${getColor('danger', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('danger', theme, 0.9)};
          }
        `;
      case 'success':
        return `
          background-color: ${getColor('success', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('success', theme, 0.9)};
          }
        `;
      case 'warning':
        return `
          background-color: ${getColor('warning', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('warning', theme, 0.9)};
          }
        `;
      case 'info':
        return `
          background-color: ${getColor('info', theme)};
          color: ${getColor('white', theme)};
          &:hover {
            background-color: ${getColor('info', theme, 0.9)};
          }
        `;
      case 'light':
        return `
          background-color: ${getColor('light', theme)};
          color: ${getColor('dark', theme)};
          &:hover {
            background-color: ${getColor('light', theme, 0.9)};
          }
        `;
      case 'dark':
        return `
          background-color: ${getColor('dark', theme)};
          color: ${getColor('light', theme)};
          &:hover {
            background-color: ${getColor('dark', theme, 0.9)};
          }
        `;
      default:
        return `
          background-color: ${getColor('gray', theme, 200)};
          color: ${getColor('gray', theme, 900)};
          &:hover {
            background-color: ${getColor('gray', theme, 300)};
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'font-size: 0.875rem;';
      case 'lg':
        return 'font-size: 1.125rem;';
      default:
        return 'font-size: 1rem;';
    }
  }}

  ${({ disabled }) =>
    disabled
      ? `
          opacity: 0.5;
          cursor: not-allowed;
          &:hover {
            opacity: 0.5;
          }
        `
      : ''}
`;