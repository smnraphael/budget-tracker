import { useState } from 'react';
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
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface TransactionsTableProps {
  transactions: Transaction[];
  onDelete: (transactionId: string) => void;
}

interface GroupedTransactions {
  [date: string]: Transaction[];
}

export function TransactionsTable({
  transactions,
  onDelete,
}: TransactionsTableProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  const groupedTransactions: GroupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = parseDate(transaction.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as GroupedTransactions
  );

  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const toggleSection = (value: string) => {
    if (openSections.includes(value)) {
      setOpenSections(openSections.filter((v) => v !== value));
    } else {
      setOpenSections([...openSections, value]);
    }
  };

  return (
    <Accordion type='multiple' className='w-full'>
      {sortedDates.map((date) => {
        const dayTransactions = groupedTransactions[date];
        return (
          <AccordionItem value={date} key={date} className='border-b'>
            <AccordionTrigger
              className='flex items-center justify-between bg-background px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline'
              onClick={() => toggleSection(date)}
            >
              <span>{date}</span>
            </AccordionTrigger>
            <AccordionContent className='pb-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                    <TableHead aria-hidden='true' />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dayTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Typography variant='p'>
                          {transaction.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='p'>
                          {transaction.category}
                        </Typography>
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
                      <TableCell className='text-right'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => onDelete(transaction.id)}
                          aria-label={`Delete transaction: ${transaction.description}`}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
