import styled from 'styled-components'; // import: styled-components 6.0.0
import { ModalProps } from '../Modal'; // import: src/shared/ui-components/Modal
import { getColor } from '../../theme'; // import: src/shared/ui-components/theme

type StyledModalProps = ModalProps & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
};

export const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 90%;
    max-width: 600px;

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

    ${({ size }) => {
      switch (size) {
        case 'sm':
          return 'width: 80%; max-width: 400px;';
        case 'lg':
          return 'width: 95%; max-width: 800px;';
        default:
          return 'width: 90%; max-width: 600px;';
      }
    }}

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .modal-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
      }

      .modal-close {
        cursor: pointer;
        font-size: 1.2rem;
      }
    }

    .modal-body {
      margin-bottom: 1rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 100%;
    }
  }
`;