import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex bg-white">
            {/* left side component */}

            {/* Right side component */}
            <div className="flex-1 md:ml-64">
                <div className="p-4">
                    <Outlet></Outlet>
                </div>
            </div>
            DashboardLayout
        </div>
    );
};

export default DashboardLayout;