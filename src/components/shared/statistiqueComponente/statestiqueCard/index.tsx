import { Card, CardContent } from "../../../ui/card";

interface FactureCardProps {
  title: string;
  titleValue: string | number;
  items: { label: string; value: string | number }[];
  progressColor?: string;
}

export const StatCard: React.FC<FactureCardProps> = ({
  title,
  titleValue,
  items,
}) => {
  return (
    <Card className="border-b-primary w-full border-b-3">
      <CardContent className="space-y-2">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="text-base text-gray-700">{title}</div>
          <span className="text-sm font-semibold text-amber-500">
            {titleValue}
          </span>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{item.label}</span>
            <span className="font-semibold text-gray-700">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
