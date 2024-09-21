'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { radialChartConfig } from './radial-chart.config';

interface RadialChartComponentProps {
  income: number;
  expenses: number;
  balance: number;
}

export function RadialChartComponent({
  income,
  expenses,
  balance,
}: RadialChartComponentProps) {
  const formattedData = [{ income: income, expenses: expenses }];

  return (
    <Card className='mt-12 flex flex-col border-none shadow-none'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Ratio</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 items-center pb-0'>
        <ChartContainer
          config={radialChartConfig}
          className='mx-auto aspect-square w-full lg:h-[300px]'
        >
          <RadialBarChart
            data={formattedData}
            endAngle={180}
            innerRadius={100}
            outerRadius={150}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className='fill-foreground text-xl font-bold'
                        >
                          {balance > 0
                            ? `+${balance.toLocaleString()}`
                            : balance.toLocaleString()}
                          €
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey='expenses'
              fill='var(--color-expenses)'
              stackId='a'
              cornerRadius={5}
              className='stroke-transparent stroke-2'
            />
            <RadialBar
              dataKey='income'
              stackId='a'
              cornerRadius={5}
              fill='var(--color-income)'
              className='stroke-transparent stroke-2'
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
