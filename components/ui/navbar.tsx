'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Typography } from './typography';
import { Button } from './button';
import { SignedIn, UserButton } from '@clerk/nextjs';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Settings', href: '/settings' },
];

export default function Navbar({ showClerkUserButton = true }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='flex justify-between'>
          <div className='flex space-x-7'>
            <div className='flex items-center px-2 py-4'>
              <Typography variant='h1'>🤑</Typography>
            </div>
            <div className='hidden items-center space-x-1 md:flex'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='px-2 py-4 transition duration-300'
                >
                  <Button variant='ghost'>
                    <Typography variant='h4'>{item.name}</Typography>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          {showClerkUserButton && (
            <div className='hidden items-center md:flex'>
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
        <div className='md:hidden'>
          <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
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
          </div>
        </div>
      )}
    </nav>
  );
}
