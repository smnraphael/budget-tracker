'use client';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className='absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-sm'>
      <Card className='absolute z-20 flex w-[350px] flex-col items-center justify-center bg-[hsl(var(--background))]'>
        <div className='flex w-full justify-between'>
          <CardHeader className='flex justify-between'>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <X onClick={onClose} className='m-4 cursor-pointer' />
        </div>
        <CardContent className='flex w-full flex-col gap-4'>
          <Input type='number' placeholder='Amount (€)' required step='0.01' />
          <Input type='text' placeholder='Description' required />
          <Input type='date' required />
          <Select onValueChange={() => {}}>
            <SelectTrigger>
              <SelectValue placeholder='Choose category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bar-chart'>Bar Chart</SelectItem>
              <SelectItem value='pie-chart'>Pie Chart</SelectItem>
              <SelectItem value='radial-chart'>Radial Chart</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Modal;
