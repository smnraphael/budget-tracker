import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Transaction } from '@/app/interfaces/transaction';
import { Typography } from '../ui/typography';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

export function RecentTransactionsTable({
  transactions,
}: RecentTransactionsTableProps) {
  return (
    <Table>
      <TableBody>
        {transactions.slice(0, 7).map((transaction) => {
          const date = new Date(transaction.date);
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

          return (
            <TableRow key={transaction.id}>
              <TableCell>
                <Typography variant='p'>{formattedDate}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='p'>{transaction.description}</Typography>
              </TableCell>
              <TableCell
                className='text-right'
                style={{
                  color:
                    transaction.category.type === 'income'
                      ? 'hsl(var(--income))'
                      : 'hsl(var(--expense))',
                }}
              >
                {transaction.category.type === 'income'
                  ? Number(transaction.amount).toFixed(2)
                  : -Number(transaction.amount).toFixed(2)}
                €
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
