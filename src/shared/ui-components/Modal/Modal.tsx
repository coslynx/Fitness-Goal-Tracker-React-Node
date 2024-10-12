import React, { useState, useEffect, useRef } from 'react'; // import: react 18.3.1
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { ModalProps } from 'src/shared/ui-components/Modal'; // import: src/shared/ui-components/Modal
import { getColor } from '../../theme'; // import: src/shared/ui-components/theme

interface ModalComponentProps extends ModalProps {
  className?: string;
}

export const Modal: React.FC<ModalComponentProps> = ({
  isOpen = false,
  onClose,
  title,
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, onClose]);

  const handleClose = () => {
    onClose();
  };

  const modalClasses = clsx(
    'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50',
    className
  );

  const modalContentClasses = clsx(
    'bg-white rounded-md shadow-lg p-6',
    variant === 'primary' ? 'bg-primary text-white' :
    variant === 'secondary' ? 'bg-secondary text-white' :
    variant === 'danger' ? 'bg-danger text-white' :
    variant === 'success' ? 'bg-success text-white' :
    variant === 'warning' ? 'bg-warning text-white' :
    variant === 'info' ? 'bg-info text-white' :
    variant === 'light' ? 'bg-light text-gray-900' :
    variant === 'dark' ? 'bg-dark text-gray-300' : '',
    size === 'sm' ? 'w-80 max-w-sm' : size === 'lg' ? 'w-11/12 max-w-xl' : 'w-10/12 max-w-lg'
  );

  return (
    showModal && (
      <div className={modalClasses} ref={modalRef}>
        <div className={modalContentClasses}>
          <div className="modal-header flex justify-between items-center mb-4">
            <h2 className="modal-title font-bold text-xl">{title}</h2>
            <button className="modal-close" onClick={handleClose}>
              <svg
                className="fill-current text-gray-600 hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    )
  );
};