import React from 'react';
import CountCard from './CountCard';
import { StaticImageData } from 'next/image';

interface Item {
  icon: string | StaticImageData;
  title: string;
  value: number | string;
  unit: string;
  percentChange?: number | string;
}

interface CountCardGroupProps {
  items: Item[];
}

const CountCardGroup = ({ items }: CountCardGroupProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <CountCard
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
          unit={item.unit}
          percentChange={item.percentChange}
        />
      ))}
    </div>
  );
};

export default CountCardGroup;
