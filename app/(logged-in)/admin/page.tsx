import AddExpenseForm from '@/app/components/add-expense-form';
import AddIncomeForm from '@/app/components/add-income-form';
import React from 'react';

function Admin() {
  return (
    <div>
      <AddIncomeForm />
      <AddExpenseForm />
    </div>
  );
}

export default Admin;
