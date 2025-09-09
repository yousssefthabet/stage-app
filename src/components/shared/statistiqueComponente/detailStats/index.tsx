interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
}

interface CardTextStatsProps {
  stats: StatItem[];
  separator?: string;
}

export const DataStats: React.FC<CardTextStatsProps> = ({
  stats,
  separator = " | ",
}) => {
  return (
    <p className="text-sm text-gray-700">
      {stats.map((stat, index) => (
        <span key={index}>
          {stat.label}: {isNaN(Number(stat.value)) ? "0" : stat.value}
          {stat.unit ? ` ${stat.unit}` : ""}
          {index < stats.length - 1 && separator}
        </span>
      ))}
    </p>
  );
};
