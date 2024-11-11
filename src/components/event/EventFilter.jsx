import {FaFilter} from "react-icons/fa";
import {useState} from "react";

const statusOptions = [
    {value: 'ALL', label: 'All'},
    {value: 'true', label: 'Not Started'},
    {value: 'false', label: 'Finished'},
];

export function EventFilter({selectedStatus, setSelectedStatus}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-[#00AA55] text-white p-3 rounded-full hover:bg-[#00AA55]/90
    transition-colors duration-300 shadow-md hover:shadow-lg"
            >
                <FaFilter/>
            </button>

            {isFilterOpen && (<div
                className="absolute right-0 mt-2 w-72 bg-white
      shadow-2xl rounded-2xl border-0 p-6 z-50
      transform transition-all duration-300 ease-in-out
      origin-top-right scale-100 opacity-100
      ring-4 ring-[#00AA55]/10
      backdrop-blur-sm"
            >
                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                    </label>
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-3
            text-gray-900 bg-gray-50
            border-2 border-gray-200
            rounded-xl
            focus:outline-none
            focus:ring-2 focus:ring-[#00AA55]/50
            focus:border-[#00AA55]
            transition duration-300
            appearance-none"
                        >
                            {statusOptions.map((status) => (<option
                                key={status.value}
                                value={status.value}
                                className="hover:bg-[#00AA55]/10"
                            >
                                {status.label}
                            </option>))}
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={() => {
                            setSelectedStatus("ALL");
                            setIsFilterOpen(false);
                        }}
                        className="text-gray-500 hover:text-gray-700
          px-3 py-2 rounded-lg
          hover:bg-gray-100
          transition duration-300"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-[#00AA55]/10 text-[#00AA55]
          px-4 py-2 rounded-lg
          hover:bg-[#00AA55]/20
          transition duration-300
          font-semibold"
                    >
                        Apply
                    </button>
                </div>
            </div>)}
        </div>
    )
}
