import { FC } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";

interface ImprovePlanProps {
  dict: RootDictionary;
}

const ImprovePlan: FC<ImprovePlanProps> = ({ dict }) => {
  return (
    <Button role="secondary" title={dict.settings.plan.improve} type="button">
      {dict.settings.plan.improve}
    </Button>
  );
};

export default ImprovePlan;
