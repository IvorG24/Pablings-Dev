// components/dashboard/modules/datacard.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbCurrencyPeso } from "react-icons/tb";

type DataCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  secondaryicon: React.ReactNode;
};

const DataCard = ({ label, value, icon, secondaryicon }: DataCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const endValue = value;
    const duration = 5000; // duration in ms
    const stepTime = 50; // step time in ms
    const totalSteps = duration / stepTime;
    const increment = (endValue - startValue) / totalSteps;

    const animate = () => {
      startValue += increment;
      if (startValue >= endValue) {
        setDisplayValue(endValue);
        return;
      }
      setDisplayValue(Math.floor(startValue));
      requestAnimationFrame(animate);
    };

    animate();
  }, [value]);

  return (
    <Card className="w-full lg:max-w-sm">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          {icon}
          <p className="text-2xl font-bold">{displayValue.toLocaleString()}</p>
        </div>
        <div>{secondaryicon}</div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
