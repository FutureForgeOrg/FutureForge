import React, { useRef } from 'react'
import ResumeForm from '../../components/ResumeMaker/ResumeForm'
import TemplateSelector from '../../components/ResumeMaker/TemplateSelector'
import ResumePreview from '../../components/ResumeMaker/ResumePreview'
import { useState } from 'react';
import { exportToPDF } from '../../components/ResumeMaker/pdfExporter';
function Resume() {
  const [formData, setFormData] = useState({
    name: "",
  email: "",
  phone: "",
  address: "",
  skills: "",
  education: [""],
  experience: "",
  projects: [""],
  certificates: [""],
  links: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const previewRef=useRef();
  return (
    <>
      <div p-y space-y-8>
        <h1 className="text-3xl font-bold text-center">Resume Builder</h1>
        <ResumeForm formData={formData} setFormData={setFormData} />
        <TemplateSelector
          selected={selectedTemplate}
          setSelected={setSelectedTemplate}
        />
        <div className="border p-4 rounded shadow" ref={previewRef}>
        <ResumePreview selected={selectedTemplate} data={formData} />
      </div>
      <div className="text-center">
        <button
          onClick={() => exportToPDF(previewRef.current)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
      </div>
    </>
  )
}

export default Resume