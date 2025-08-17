import React, { useRef } from 'react';
import TemplateSelector from '../../components/ResumeMaker/TemplateSelector';
import ResumePreview from '../../components/ResumeMaker/ResumePreview';
import { exportToPDF } from '../../components/ResumeMaker/pdfExporter';
import useResumeStore from '../../store/useResumeStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function PreviewPage() {
  const previewRef = useRef();
   const navigate = useNavigate();
  // Pull state directly from the global store
  const { formData, selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <>
    <Navbar />
    <div className='mt-20'>
    <div className='mt-6'>
        <div className="mb-4">
      <TemplateSelector
        selected={selectedTemplate}
        setSelected={setSelectedTemplate}
      />
      </div>

      <div className="border p-4 rounded shadow" ref={previewRef}>
        <ResumePreview selected={selectedTemplate} data={formData} />
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => exportToPDF(previewRef.current)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        <button onClick={() => navigate('/tools/resume')}
            className="bg-gray-600 text-white px-4 py-2 rounded ml-4">
            Back to edit
        </button>
      </div>
    </div>
    </div>
    </>
  );
}

export default PreviewPage;
