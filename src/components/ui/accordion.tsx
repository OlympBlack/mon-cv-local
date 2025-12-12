import * as React from "react";

export const Accordion = ({ children, type, className }: any) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ value, children }: any) => {
  return <div data-value={value}>{children}</div>;
};

export const AccordionTrigger = ({ children, className }: any) => {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
};

export const AccordionContent = ({ children, className }: any) => {
  return <div className={className}>{children}</div>;
};
