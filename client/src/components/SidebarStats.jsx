import { useEffect, useState } from 'react';
import { fetchStats } from '../api/apiService'; // Import the service function

const SidebarStats = () => {
    const [stats, setStats] = useState({
        questions: 0,
        answers: 0,
        users: 0
    });

    useEffect(() => {
        const getStats = async () => {
            try {
                const statsData = await fetchStats(); // Call the service function
                setStats(statsData);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        getStats();
    }, []);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Questions Asked</h3>
                <p className="text-2xl font-bold text-blue-500">{stats.questions}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Answers Given</h3>
                <p className="text-2xl font-bold text-blue-500">{stats.answers}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Users Registered</h3>
                <p className="text-2xl font-bold text-blue-500">{stats.users}</p>
            </div>
        </div>
    );
};

export default SidebarStats;
