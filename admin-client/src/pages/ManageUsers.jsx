import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useBanUser, useUnBanUser, useUsersQuery } from '../hooks/useUsersQuery';
// import { Loader } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce.js';
import useUsersStore from '../store/useUsersStore';
import Pagination from '../components/ui/Pagination';
import toast from 'react-hot-toast';
import { Lock, LockOpen } from 'lucide-react';


const ManageUsers = () => {
    const { isLoading, isError, data, error } = useUsersQuery();
    const { email, page, setEmail, setPage } = useUsersStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [localEmail, setLocalEmail] = useState(email);
    const debouncedEmail = useDebounce(localEmail, 600);

    const banUser = useBanUser();
    const unBanUser = useUnBanUser();

    useEffect(() => {
        setEmail('email', debouncedEmail);
        setPage(1);
    }, [debouncedEmail]);

    const totalPages = Math.ceil(data?.totalUsers / 10) || 25;
    const users = data?.users || [];
    console.log(totalPages)

    if (isError) return <div>Error: {error.message}</div>;

    const onClickBan = async (userId) => {
        try {
            await banUser.mutateAsync(userId);
            toast.success("User banned successfully");
        } catch (error) {
            toast.error("Failed to ban user", error);
        }
    }

    const onCLickUnBan = async (userId) => {
        try {
            await unBanUser.mutateAsync(userId);
            toast.success("User unbanned successfully");
        }
        catch (error) {
            toast.error("Failed to unban user", error);
        }
    }

    return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center bg-purple-600 text-white p-4 sticky top-0 z-40">
                <h1 className="text-xl font-bold">FutureForge</h1>
                <button onClick={() => setSidebarOpen(true)} className="text-2xl">☰</button>
            </div>

            <div className="p-6 md:ml-72 ml-0 bg-white min-h-screen overflow-x-auto">
                <div className="">
                    <h1 className="text-3xl font-bold mb-2 text-center">Manage Users</h1>
                    <p className="text-gray-700 mb-4 text-center">Here you can manage all users in the system.</p>

                    <div className='flex items-center justify-center w-full'>
                        {/* search filter for email */}
                        <div className="mb-4 w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Search by email..."
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                onChange={(e) => setLocalEmail(e.target.value)}
                                value={localEmail}
                            />
                        </div>
                    </div>

                    <div className="p-6 overflow-x-auto text-sm">

                        {/* Desktop Table - overflow on mobile*/}
                        <table className="bg-white md:min-w-full rounded-lg border border-gray-200 shadow-md ">
                            <thead className="bg-white border-b">
                                <tr className='font-semibold'>
                                    <th className="py-2 px-4 border-b text-left">Username</th>
                                    <th className="py-2 px-4 border-b text-left">Email</th>
                                    <th className="py-2 px-4 border-b text-left">Role</th>
                                    <th className="py-2 px-4 border-b text-left">Created At</th>
                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : isError ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-red-500">Error loading users</td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No users found</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="border-b dark:border-gray-700">
                                            <td className="py-2 px-4 border-b">{user.username}</td>
                                            <td className="py-2 px-4 border-b">{user.email}</td>
                                            <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                                            <td className="py-2 px-4 border-b">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {user.isBanned ? (
                                                    <button
                                                        className="text-green-500 hover:text-green-700"
                                                        onClick={() => onCLickUnBan(user._id)}
                                                    >
                                                        <LockOpen size={18} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => onClickBan(user._id)}
                                                    >
                                                        <Lock  size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </>
    );
};

export default ManageUsers;
