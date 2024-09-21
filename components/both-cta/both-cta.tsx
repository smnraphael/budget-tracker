import React from 'react';
import { Button } from '../ui/button';

function BothCta() {
  return (
    <div className='mt-2 flex justify-end gap-4'>
      <Button variant='outline' className='text-[hsl(var(--income))]'>
        Add Income
      </Button>
      <Button variant='outline' className='text-[hsl(var(--expense))]'>
        Add Expense
      </Button>
    </div>
  );
}

export default BothCta;
