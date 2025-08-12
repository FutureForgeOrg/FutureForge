export default function TemplateSelector({ selected, setSelected }) {
  return (
    <div className="flex justify-center gap-4">
      {[1, 2 ,3 ,4 ,5].map((template) => (
        <button
          key={template}
          onClick={() => setSelected(template)}
          className={`px-4 py-2 border rounded ${
            selected === template ? "bg-blue-600 text-white" : ""
          }`}
        >
          Template {template}
        </button>
      ))}
    </div>
  );
}
