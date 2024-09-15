'use client';

import { useEffect, useState } from 'react';

function AddIncomeForm() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  async function fetchCategories() {
    const response = await fetch('/api/categories/incomes');
    const data = await response.json();
    const incomeCategories = data.filter(
      (category: { type: string }) => category.type === 'income'
    );
    setCategories(incomeCategories);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      amount,
      categoryId,
      date,
      description,
    };

    const response = await fetch('/api/transactions/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });

    if (response.ok) {
      alert('Transaction added successfully');
    } else {
      const result = await response.json();
      alert(result.message || 'Error adding transaction');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount'
      />
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type='submit'>Add Income</button>
    </form>
  );
}

export default AddIncomeForm;
