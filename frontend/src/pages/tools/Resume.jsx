import React, { useState } from 'react';
import PersonalInfoForm from '../../components/resume/PersonalInfoForm';
import EducationForm from '../../components/resume/EducationForm';
import SkillsForm from '../../components/resume/SkillsForm';
import ProjectsForm from '../../components/resume/ProjectsForm';
import ExperienceForm from '../../components/resume/ExperienceForm';
import ResumePreview from '../../components/resume/ResumePreview';
import DownloadButton from '../../components/resume/DownloadButton';

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    education: [],
    skills: {},
    projects: [],
    experience: [],
  });

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      <div className="w-full md:w-1/2 space-y-4 overflow-y-auto h-screen">
        <PersonalInfoForm setResumeData={setResumeData} />
        <EducationForm setResumeData={setResumeData} />
        <SkillsForm setResumeData={setResumeData} />
        <ProjectsForm setResumeData={setResumeData} />
        <ExperienceForm setResumeData={setResumeData} />
      </div>
      <div className="w-full md:w-1/2">
        <ResumePreview resumeData={resumeData} />
         <DownloadButton />
      </div>
    </div>
  );
};

export default Resume;
