import React from 'react';
import html2pdf from 'html2pdf.js';

const DownloadButton = () => {
  const handleDownload = () => {
    const resumeElement = document.getElementById('resume-preview');

    const options = {
      margin: 0.5,
      filename: 'Purv_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(resumeElement).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;
