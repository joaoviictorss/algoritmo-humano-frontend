import { Check } from "lucide-react";

interface LearningItemProps {
  text: string;
}

const LearningItem = ({ text }: LearningItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <Check className="flex-shrink-0 text-primary" size={16} />
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  );
};

interface OverviewTabProps {
  description: string;
  learningItems: string[];
}

export const OverviewTab = ({
  description,
  learningItems,
}: OverviewTabProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg border bg-white p-4">
      <div className="space-y-1.5">
        <h3 className="font-semibold">Sobre o curso</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">O que você vai aprender</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {learningItems.map((item, index) => (
            <LearningItem key={index} text={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
