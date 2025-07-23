import clsx from 'clsx';
import React, { FC } from 'react';

export interface Props {
  height?: number;
  width?: number;
  variant?: string;
  className?: string;
  onClick?: (() => void) | ((e: any) => void);
  isButton?: boolean;
  disable?: boolean;
  isSubmit?: boolean;
}

const Button: FC<React.PropsWithChildren<Props>> = ({
  children,
  variant = 'default',
  height = 38,
  width,
  className = '',
  onClick,
  disable = false,
  isSubmit,
  ...otherProps
}) => {
  const rootClassName = clsx(
    'flex justify-center items-center cursor-pointer rounded-[91px] hover:bg-white/5 transition-colors',
    className,
    {
      'bg-transparent': variant === 'default',
      'bg-[var(--background)] gradient-border': variant === 'gradientBorder',
      'opacity-50 cursor-not-allowed': disable,
    }
  );

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      disabled={disable}
      className={rootClassName}
      onClick={onClick}
      style={{ height, width }}
      {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
