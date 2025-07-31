import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { authUser } = useAuthStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full md:top-2 md:left-2 md:h-[98%] bg-purple-300 w-72 p-4 z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block overflow-y-hidden 
        ${sidebarOpen ? '' : 'border-r-2 border-purple-700 rounded-lg'}`}>

        {/* Close on mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)} className="text-xl font-bold">✕</button>
        </div>

        <div className="text-center text-2xl font-bold text-gray-800 mb-6 hidden md:block">
          <h1 className="text-3xl font-bold">FutureForge</h1>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center space-y-4 bg-purple-400 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center space-x-2">
            <img
              src='admin.svg'
              alt="Profile"
              className="size-12 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{authUser?.username}</h4>
              <p className="text-sm text-gray-600">{authUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">Dashboard</a>
          <a href="/users" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">Users</a>
          <a href="/jobs" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">Jobs</a>
          <a href="/portfolios" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">Portfolios</a>
          <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">Settings</a>
          <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-purple-600 hover:text-white rounded">New Admin</a>
          <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white rounded">Logout</a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
