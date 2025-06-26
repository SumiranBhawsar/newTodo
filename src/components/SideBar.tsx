import { Plus, Search, Inbox } from "lucide-react";

export default function SideBar() {
  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
      {/* Top Section */}
      <div className="space-y-4">
        {/* App Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full font-bold">
            C
          </div>
          <span className="font-semibold text-gray-700">Cloudinary</span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <button className="flex items-center space-x-2 text-red-500 font-medium hover:bg-red-50 w-full p-2 rounded">
            <Plus size={16} />
            <span>Add task</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 w-full p-2 rounded">
            <Search size={16} />
            <span>Search</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 w-full p-2 rounded">
            <Inbox size={16} />
            <span>Inbox</span>
          </button>
        </div>
      </div>
    </div>
  );
}
