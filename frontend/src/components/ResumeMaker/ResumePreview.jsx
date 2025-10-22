import Templates1 from './templates/Templates1'
import Templates2 from './templates/Templates2'
import Templates3 from './templates/Templates3'
import Template4 from './templates/Template4'
import Templates5 from './templates/Templates5'
import Template6 from './templates/Template6'
// import Navbar from '../Navbar'

function ResumePreview({ selected, data }) {
  const templates = {
    1: <Templates1 data={data} />,
    2: <Templates2 data={data} />,
    3: <Templates3 data={data} />,
    4: <Template4 data={data} />,
    5: <Templates5 data={data} />,
    6: <Template6 data={data} />,
  };

  return (<>
  
  {/* <Navbar/> */}
  {/* <div className='mt-10 p-4'> */}
  <div>{templates[selected]}</div>
  {/* </div> */}
</>);
}

export default ResumePreview;