import { Transaction } from '@/app/interfaces/transaction';
import TransactionsTable from '@/components/transactions-table/transactions-table';

const transactionsData: Transaction[] = [
  {
    id: '1',
    date: 'August 12, 2024',
    category: 'Housing 🏡',
    description: 'Rent Payment',
    amount: -1200.0,
  },
  {
    id: '2',
    date: 'August 10, 2024',
    category: 'Groceries 🛒',
    description: 'Supermarket',
    amount: -150.0,
  },
  {
    id: '3',
    date: 'August 8, 2024',
    category: 'Transportation 🚗',
    description: 'Gas Station',
    amount: -60.0,
  },
  {
    id: '4',
    date: 'August 5, 2024',
    category: 'Salary 💼',
    description: 'Company Payroll',
    amount: 2500.0,
  },
  {
    id: '5',
    date: 'August 3, 2024',
    category: 'Entertainment 🎉',
    description: 'Concert Tickets',
    amount: -75.0,
  },
  {
    id: '6',
    date: 'August 1, 2024',
    category: 'Utilities 💡',
    description: 'Electricity Bill',
    amount: -100.0,
  },
];

function Transactions() {
  return (
    <>
      <TransactionsTable transactions={transactionsData} />
    </>
  );
}

export default Transactions;
