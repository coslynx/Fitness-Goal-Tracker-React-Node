import React from 'react'; // import: react 18.3.1
import { useRouter } from 'next/navigation'; // import: next 14.2.15
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import clsx from 'clsx'; // import: clsx 1.2.1
import { NavItemProps } from 'src/shared/ui-components/NavItem'; // import: src/shared/ui-components/NavItem

type NavItemComponentProps = NavItemProps & {
  className?: string;
};

export const NavItem: React.FC<NavItemComponentProps> = ({
  href,
  label,
  icon,
  className,
  ...rest
}) => {
  const router = useRouter();
  const { theme } = useTheme();

  const navItemClasses = clsx(
    'flex items-center px-4 py-2 rounded-md text-sm font-medium',
    theme === 'dark'
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
      : 'text-gray-900 hover:bg-gray-200',
    className
  );

  const handleClick = () => {
    router.push(href);
  };

  return (
    <li className={navItemClasses} onClick={handleClick} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </li>
  );
};