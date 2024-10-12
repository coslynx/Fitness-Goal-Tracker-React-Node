import styled from 'styled-components';
import { CardProps } from '../Card';
import { getColor } from '../../theme';

type StyledCardProps = CardProps & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
};

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: white;
  color: #212529;
  width: 100%;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${getColor('primary', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'secondary':
        return `
          background-color: ${getColor('secondary', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'danger':
        return `
          background-color: ${getColor('danger', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'success':
        return `
          background-color: ${getColor('success', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'warning':
        return `
          background-color: ${getColor('warning', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'info':
        return `
          background-color: ${getColor('info', theme)};
          color: ${getColor('white', theme)};
        `;
      case 'light':
        return `
          background-color: ${getColor('light', theme)};
          color: ${getColor('dark', theme)};
        `;
      case 'dark':
        return `
          background-color: ${getColor('dark', theme)};
          color: ${getColor('light', theme)};
        `;
      default:
        return `
          background-color: ${getColor('white', theme)};
          color: ${getColor('dark', theme)};
        `;
    }
  }}

  @media (max-width: 768px) {
    width: 100%;
  }
`;