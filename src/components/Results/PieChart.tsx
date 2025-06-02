import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartData } from '../../types';
import { formatCurrency } from '../../utils/calculations';

interface PieChartProps {
  data: ChartData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gold rounded shadow-lg">
        <p className="font-medium">{payload[0].name}: {formatCurrency(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-maroon">No data to display</p>
      </div>
    );
  }

  return (
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;