import React from "react";
import { useAppContext } from "../Context";

interface DocumentProps {
  children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
  const { contentRef } = useAppContext();
  return (
    <div
      ref={contentRef}
      id="pdfContent"
      className="w-[794px] m-auto rounded-sm bg-white p-5 shadow relative print:shadow-transparent"
    >
      {children}
    </div>
  );
};

export default Document;
