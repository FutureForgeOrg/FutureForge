import bookmark from '../../assets/bookmark.png';
const JobCard = ({ job }) => {
  return (
    <div className="rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent">
      <h3 className="text-xl font-semibold">{job.company}</h3>
      <p className="text-sm text-white">{job.title}</p>
      <p className="text-sm text-white">{job.location}</p>
      {job.description && <p className="text-sm text-white">{job.description}</p>}

      <div className="flex gap-3 mt-3">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Apply Now</button>
        <button className="border px-3 py-1 rounded">Backup Link 1</button>
        <button className="border px-3 py-1 rounded">Backup Link 2</button>
      </div>

      <div className="absolute top-2 right-2">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <img src={bookmark} alt="Bookmark" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
