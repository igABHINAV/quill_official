// Import necessary modules and styles
"use client";

import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// JSON data to be displayed in the editor
const jsonData = [
  {
    id: "25f557ae-a415-4559-ae93-cbedd088a431",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 1,
    },
    content: [
      {
        type: "text",
        text: "Notes tab!",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "fc3d3704-589e-4b9c-8608-499f56c90967",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Use this to create and download your notes!",
        styles: {},
      },
    ],
    children: [],
  },
];

// Main Page component
export default function Editor() {
  // Creates a new editor instance with the JSON data as initial content
  const editor = useCreateBlockNote();

  const handleDownload = async () => {
    const input = document.querySelector('.item');
    if (input && input instanceof HTMLElement) { // Ensure input is an HTMLElement
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('editor-content.pdf');
    }
  };

  return (
    <div className={"wrapper"}>
      <div className={"item"}>
        <BlockNoteView editor={editor} />
      </div>
      <div className="py-4 mx-4 flex justify-between">
        <Button variant="default" onClick={handleDownload}>Download as PDF <Download/></Button>
      </div>
    </div>
  );
}
