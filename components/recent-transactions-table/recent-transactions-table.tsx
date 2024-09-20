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
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <Typography variant='p'>{transaction.date}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='p'>{transaction.description}</Typography>
            </TableCell>
            <TableCell
              className='text-right'
              style={{
                color:
                  transaction.amount > 0
                    ? 'hsl(var(--income))'
                    : 'hsl(var(--expense))',
              }}
            >
              {transaction.amount.toFixed(2)}€
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
