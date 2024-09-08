'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'regular' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  onClick: () => void;
  children: ReactNode;
}

const baseStyles =
  'font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-slate-100 hover:bg-slate-700 focus:ring-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-400 dark:focus:ring-slate-300',
  secondary:
    'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-700',
};

const sizeStyles: Record<Size, string> = {
  large: 'px-8 py-4 text-lg',
  regular: 'px-4 py-2 text-md',
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'regular',
  children,
  onClick,
  ...props
}) => {
  const classes = clsx(baseStyles, variantStyles[variant], sizeStyles[size]);

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
