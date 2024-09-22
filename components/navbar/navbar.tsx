'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Typography } from '../ui/typography';
import { Button } from '../ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Settings', href: '/settings' },
];

export default function Navbar({ showClerkUserButton = true }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed left-0 top-0 z-10 w-full border-b-2 bg-[hsl(var(--background))]'>
      <div className='z-10 mx-auto w-full max-w-6xl px-4'>
        <div className='flex justify-between'>
          <div className='flex space-x-7'>
            <div className='flex items-center px-2 py-4'>
              <Typography variant='h3'>🤑</Typography>
            </div>
            <div className='hidden items-center space-x-1 md:flex'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='px-2 py-2 transition duration-300'
                >
                  <Button variant='ghost' className='hover:cursor-pointer'>
                    <Typography variant='p'>{item.name}</Typography>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          {showClerkUserButton && (
            <div className='hidden items-center px-2 py-4 md:flex'>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          )}
          <div className='flex items-center md:hidden'>
            <button
              className='mobile-menu-button outline-none'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute w-full border-b md:hidden'>
          <div className='space-y-1 border-b bg-[hsl(var(--background))] px-2 pb-4 pt-2 sm:px-3'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='block rounded-md px-3 py-2'
                onClick={() => setIsOpen(false)}
              >
                <Button variant='ghost' className='w-full'>
                  <Typography variant='h4'>{item.name}</Typography>
                </Button>
              </Link>
            ))}
            {showClerkUserButton && (
              <div className='flex justify-center rounded-md px-3 py-2 md:flex'>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
