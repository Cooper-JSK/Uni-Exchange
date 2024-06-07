import Questions from "../components/Questions.jsx";
import SidebarLeft from "../components/SidebarLeft.jsx";

const HomePage = () => {
    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-7xl p-5">
                <div className="w-1/5">
                    <SidebarLeft />
                </div>
                <div className="w-3/5 mx-4">
                    <h2 className="text-xl font-semibold">Top Questions</h2>
                    <Questions />
                </div>
                <div className="w-1/5 mx-4">
                    <h2 className="text-xl font-semibold">User Profile</h2>

                </div>
            </div>
        </div>
    );
}

export default HomePage;
