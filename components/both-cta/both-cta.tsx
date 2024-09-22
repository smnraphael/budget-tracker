'use client';

import { useState } from 'react';
import Modal from '../modal/modal';
import { Button } from '../ui/button';

interface BothCtaProps {
  fetchBalance: () => Promise<void>;
  fetchTransactions: (month: Date) => Promise<void>;
}

function BothCta({ fetchBalance, fetchTransactions }: BothCtaProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCta, setModalCta] = useState('');
  const [transactionType, setTransactionType] = useState<
    'income' | 'expense' | null
  >(null);

  const handleOpenModal = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setModalTitle(type === 'income' ? 'New Income' : 'New Expense');
    setModalCta(type === 'income' ? 'Add Income' : 'Add Expense');
    setModalOpen(true);
  };

  return (
    <>
      <div className='mt-2 flex justify-end gap-4'>
        <Button
          variant='outline'
          className='border-2 border-[hsl(var(--income))] text-[hsl(var(--income))] hover:text-[hsl(var(--income))]'
          onClick={() => handleOpenModal('income')}
        >
          Add Income
        </Button>
        <Button
          variant='outline'
          className='border-2 border-[hsl(var(--expense))] text-[hsl(var(--expense))] hover:text-[hsl(var(--expense))]'
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
        type={transactionType}
        fetchBalance={fetchBalance}
        fetchTransactions={fetchTransactions}
      />
    </>
  );
}

export default BothCta;
