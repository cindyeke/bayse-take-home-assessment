"use client";
import { useState, ReactNode } from "react";

function Accordion({
  title,
  children,
}: {
  title: ReactNode | string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-dark-blue-10 rounded-[10px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center h-[51px] bg-grey-lighter p-[17px] pt-[19px] font-semibold text-[14px] text-dark-blue-60 font-archivo"
      >
        {title}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
