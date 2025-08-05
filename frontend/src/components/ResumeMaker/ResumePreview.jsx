import Templates1 from './templates/Templates1'
import Templates2 from './templates/Templates2'
import Templates3 from './templates/Templates3'

function ResumePreview({ selected, data }) {
  const templates = {
    1: <Templates1 data={data} />,
    2: <Templates2 data={data} />,
    3: <Templates3 data={data} />,
  };

  return <div>{templates[selected]}</div>;
}

export default ResumePreview;