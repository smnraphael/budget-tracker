export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: {
    name: string;
    type: 'income' | 'expense';
  };
}
