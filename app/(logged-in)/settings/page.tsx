import { Typography } from '@/components/ui/typography';
import React from 'react';
import PageComponents from './page.components';

function Settings() {
  return (
    <>
      <Typography variant='h1' className='px-2'>
        Settings
      </Typography>
      <PageComponents />
    </>
  );
}

export default Settings;
