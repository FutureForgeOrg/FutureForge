import { Routes, Route } from "react-router-dom";
import InterviewPanel from "../../components/Interview/InterviewPanel";
import InterviewSetupPanel from "../../components/Interview/InterviewSetupPanel";

const Interview = () => {
  return (
    <Routes>
      <Route path="/" element={<InterviewSetupPanel />} />
      <Route path="InterviewPanel" element={<InterviewPanel />} />
    </Routes>
  );
};

export default Interview;