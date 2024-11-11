import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {FaSearch} from "react-icons/fa";

const EventSearch = ({onSearchResults, setIsSearching}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchSearchResults = useCallback(async () => {
        if (searchQuery.trim() === '') {
            // setSearchResults([]);
            onSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`event/search?name=${searchQuery}`);
            console.log("search results", response.data);
            // setSearchResults(response.data);
            onSearchResults(response.data.data);
            setError(null); // Reset error state
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch results. Please try again later.');
        }
    }, [searchQuery, onSearchResults]);

    // useEffect(() => {
    //     fetchSearchResults();
    // }, [fetchSearchResults]); // Only depend on fetchSearchResults

    useEffect(() => {
        if (!searchQuery) {
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        fetchSearchResults();
    }, [fetchSearchResults, searchQuery, setIsSearching]);


    return (
        <div className="relative w-1/2 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaSearch
                    className="h-6 w-6 text-gray-400 group-focus-within:text-[#00AA55] transition-colors duration-300"/>
            </div>
            <input
                type="text"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white rounded-full border-2 border-gray-300
                        focus:outline-none focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30
                        transition-all duration-300 ease-in-out
                        placeholder-gray-400
                        shadow-sm hover:shadow-md"
            />
        </div>
    );
};

export default EventSearch;