'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface FormData {
  amount: string;
  category: string;
  date: string;
  description: string;
}

export interface Category {
  name: string;
  type: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cta: string;
  type: 'income' | 'expense' | null;
  fetchTransactions: () => Promise<void>;
}

function Modal({
  title,
  cta,
  onClose,
  isOpen,
  type,
  fetchTransactions,
}: ModalProps) {
  const methods = useForm<FormData>();
  const { handleSubmit, register, setValue } = methods;

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint =
        type === 'income'
          ? '/api/categories/income/get'
          : '/api/categories/expenses/get';
      const response = await fetch(endpoint);
      const data = await response.json();
      setCategories(data);
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, type]);

  const onSubmit = async (data: FormData) => {
    const transactionData = {
      amount: data.amount,
      categoryId: data.category,
      date: data.date,
      description: data.description,
    };

    const response = await fetch('/api/transactions/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });

    if (response.ok) {
      alert('Transaction added successfully');
      onClose();
      await fetchTransactions();
    } else {
      const result = await response.json();
      alert(result.message || 'Error adding transaction');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm'>
      <Card className='absolute z-20 flex w-[350px] flex-col items-center justify-center bg-[hsl(var(--background))]'>
        <div className='flex w-full justify-between'>
          <CardHeader className='flex justify-between'>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <X onClick={onClose} className='m-4 cursor-pointer' />
        </div>
        <CardContent className='flex w-full flex-col gap-4'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <Input
                type='text'
                placeholder='Description'
                required
                {...register('description')}
              />
              <Input
                type='number'
                placeholder='Amount (€)'
                step='0.01'
                required
                {...register('amount')}
              />
              <Input type='date' required {...register('date')} />
              <Select
                onValueChange={(value) => setValue('category', value)}
                required
              >
                <SelectTrigger className='w-auto'>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button type='submit'>{cta}</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default Modal;
