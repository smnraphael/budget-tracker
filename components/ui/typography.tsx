'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
  children: ReactNode;
};

const baseStyles = {
  h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'pb-2 text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  p: 'leading-7',
};

export const Typography = ({
  variant,
  className,
  children,
}: TypographyProps) => {
  const Element = variant;
  const styles = clsx(baseStyles[variant], className);

  return <Element className={styles}>{children}</Element>;
};
