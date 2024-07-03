import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbCurrencyPeso } from "react-icons/tb";
type DataCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  secondaryicon: React.ReactNode;
};

const DataCard = ({ label, value, icon, secondaryicon }: DataCardProps) => {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          {icon}
          <p>{value}</p>
        </div>
        <div>{secondaryicon}</div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
