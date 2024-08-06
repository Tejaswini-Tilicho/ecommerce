import React from "react";

interface Step {
  stringStep: any;
  setCurrentStep: (step: number) => void;
}

const Steps: React.FC<Step> = ({ stringStep, setCurrentStep }) => {
  const steps = ["Address", "Shipping", "Payment"];

  const handleStepClick = (step: string) => {
    const stepIndex = steps.indexOf(step);
    setCurrentStep(stepIndex);
  };

  return (
    <div className="flex space-x-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center space-x-2">
          <div
            className={`inline-block cursor-pointer ${
              stringStep === step ? "font-bold" : ""
            }`}
            onClick={() => handleStepClick(step)}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="border border-black border-solid w-24"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Steps;
