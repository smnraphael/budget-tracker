import { useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '@/app/interfaces/transaction';
import { Typography } from '../ui/typography';

interface TransactionsTableProps {
  transactions: Transaction[];
  handleDelete: (id: string) => Promise<void>;
}

export default function TransactionsTable({
  transactions,
  handleDelete,
}: TransactionsTableProps) {
  const [isMobile, setIsMobile] = useState(false);

  const groupedTransactions: { [date: string]: Transaction[] } =
    transactions.reduce(
      (groups, transaction) => {
        if (!groups[transaction.date]) {
          groups[transaction.date] = [];
        }
        groups[transaction.date].push(transaction);
        return groups;
      },
      {} as { [date: string]: Transaction[] }
    );

  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isMobile
      ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className='hidden md:table-cell'>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedDates.map((date) => {
          const dailyTransactions = groupedTransactions[date];
          return dailyTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(date)}</TableCell>
              <TableCell className='font-medium'>
                {transaction.description}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {transaction.category.name}
              </TableCell>
              <TableCell
                style={{
                  color:
                    transaction.category.type === 'income'
                      ? 'hsl(var(--income))'
                      : 'hsl(var(--expense))',
                }}
              >
                {transaction.category.type === 'income' ? (
                  <Typography variant='p' className='font-bold'>
                    {formatAmount(Number(transaction.amount))}€
                  </Typography>
                ) : (
                  <Typography variant='p' className='font-bold'>
                    -{formatAmount(Number(transaction.amount))}€
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup='true' size='icon' variant='ghost'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ));
        })}
      </TableBody>
    </Table>
  );
}
