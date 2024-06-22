import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1300px] w-full bg-stone-900 min-h-screen mx-auto flex flex-col">
      {children}
    </div>
  );
};

export default Container;
