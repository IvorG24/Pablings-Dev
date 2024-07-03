import StepService from "@/components/scheduling/services";
import StepExtraServices from "@/components/scheduling/extras";
import StepStaff from "@/components/scheduling/staff";
import StepDateTime from "@/components/scheduling/date";
import StepPersonalInfo from "@/components/scheduling/information";
import StepConfirmation from "@/components/scheduling/confirmation";

export const useSelection = () => {
  const steps = [
    <StepService />,
    <StepExtraServices />,
    <StepStaff />,
    <StepDateTime />,
    <StepPersonalInfo />,
    <StepConfirmation />,
  ];

  return {
    steps,
  };
};
