'use client';

import { useState } from 'react';
import Modal from '../modal/modal';
import { Button } from '../ui/button';

function BothCta() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCta, setModalCta] = useState('');

  const handleOpenModal = (type: 'income' | 'expense') => {
    setModalTitle(type === 'income' ? 'New Income' : 'New Expense');
    setModalCta(type === 'income' ? 'Add Income' : 'Add Expense');
    setModalOpen(true);
  };

  return (
    <>
      <div className='mt-2 flex justify-end gap-4'>
        <Button
          variant='outline'
          className='text-[hsl(var(--income))]'
          onClick={() => handleOpenModal('income')}
        >
          Add Income
        </Button>
        <Button
          variant='outline'
          className='text-[hsl(var(--expense))]'
          onClick={() => handleOpenModal('expense')}
        >
          Add Expense
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        cta={modalCta}
      />
    </>
  );
}

export default BothCta;
