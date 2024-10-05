import Questions from "@/components/Questions.jsx";
import SidebarLeft from "@/components/SidebarLeft.jsx";
import SidebarStats from "@/components/SidebarStats.jsx";

const HomePage = ({ filterCategory, setFilterCategory }) => {
    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7xl p-5">
                <div className="w-1/5 hidden md:block">
                    <SidebarLeft setFilterCategory={setFilterCategory} /> {/* Pass the state updater */}
                </div>
                <div className="w-full md:w-3/5 mx-4">
                    <h2 className="text-xl font-semibold">Top Questions</h2>
                    <Questions filterCategory={filterCategory} /> {/* Pass the category filter */}
                </div>
                <div className="w-1/5 hidden md:block">
                    <SidebarStats />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
