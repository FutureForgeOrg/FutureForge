import { useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

import { Loader } from "../components/ui/Loader";
import { useAuthStore } from "../store/useAuthStore";

const COLORS = ['#4f46e5', '#22c55e', '#f97316', '#e11d48'];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading, isError } = useDashboardData();
  const { authUser } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-center text-red-600 mt-10">Error loading dashboard data</div>;
  }

  const { summary, charts } = data;
  const userStats = charts?.monthlyUserStats || [];
  const jobStats = charts?.monthlyJobStats || [];

  const genderData = charts?.genderDistribution?.map((item) => ({
    name: item._id || 'Unknown',
    value: item.count,
  })) || [];

  const roleData = charts?.roleDistribution?.map((item) => ({
    name: item._id || 'Unknown',
    value: item.count,
  })) || [];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-purple-600 text-white p-4 sticky top-0 z-40">
        <h1 className="text-xl font-bold">FutureForge</h1>
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">☰</button>
      </div>

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

        {/* NavLinks */}
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

      {/* Main content */}
      <div className="ml-0 md:ml-72 pl-6 h-screen overflow-y-auto bg-gray-50 p-4 space-y-6">
        <h2 className="text-3xl font-semibold text-center pb-4">Admin Dashboard</h2>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(summary || {}).map(([key, value]) => (
            <div key={key} className="bg-white p-4 shadow rounded-lg border-2 border-black">
              <p className="font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </p>
              <h3 className="text-xl font-bold">{value}</h3>
            </div>
          ))}
        </div>

        {/* Line Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
            <h4 className="text-lg font-semibold mb-4 text-center">Monthly Signups</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 1']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Users"
                  stroke="red"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "red" }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
            <h4 className="text-lg font-semibold mb-4 text-center">Jobs Scraped Monthly</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 100']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Jobs"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "red" }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
            <h4 className="text-lg font-semibold mb-4 text-center">Gender Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-gender-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-2 border-black">
            <h4 className="text-lg font-semibold mb-4 text-center">Role Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-role-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
