import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetail, setSelectedEvent } from "@/redux/slice/eventSlice";
import EventSearch from "@/components/event/EventSearch.jsx";
import EventGrid from "@/components/event/EventGrid.jsx";
import EventPagination from "@/components/event/EventPagination.jsx";
import EventDetailModal from "@/components/event/EventDetailModal.jsx";
import EventHeader from "@/components/event/EventHeader.jsx";
import { EventFilter } from "@/components/event/EventFilter.jsx";

const EventsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [selectedSort, setSelectedSort] = useState('startDate'); // State untuk sorting
    const [isCancelled, setIsCancelled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Jumlah item per halaman
    const dispatch = useDispatch();
    const { event, status, selectedEvent } = useSelector((state) => state.event);
    const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan nilai pencarian

    const fetchEvents = useCallback(() => {
        dispatch(getEventDetail());
    }, [dispatch]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleEventDetail = (selectedEvent) => {
        dispatch(setSelectedEvent(selectedEvent));
        setIsOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        dispatch(getEventDetail({ page })); // Panggil API dengan halaman baru
    };

    const onSearchResults = (results) => {
        setSearchResults(results);
        setIsSearching(true);
    };

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                // Panggil API atau filter hasil sesuai dengan searchTerm
                // Anda dapat memanggil fungsi fetch atau melakukan filter di sini
                // Misalnya: dispatch(fetchSearchResults(searchTerm));
            } else {
                setIsSearching(false);
                setSearchResults([]); // Reset search results jika searchTerm kosong
            }
        }, 300); // Waktu debounce dalam milidetik

        return () => {
            clearTimeout(handler); // Membersihkan timeout saat komponen di-unmount atau searchTerm berubah
        };
    }, [searchTerm]);

    // Filter events berdasarkan selectedStatus
    const events = () => {
        let filteredEvents;

        const isEventNotStarted = (item) => new Date(item.startDate) > new Date();
        const isEventFinished = (item) => new Date(item.startDate) < new Date();

        if (selectedStatus === 'ALL') {
            filteredEvents = isSearching ? searchResults : event;
        } else if (selectedStatus === 'true') {
            filteredEvents = isSearching ? 
                searchResults.filter(isEventNotStarted) : 
                event.filter(isEventNotStarted);
        } else if (selectedStatus === 'false') {
            filteredEvents = isSearching ? 
                searchResults.filter(isEventFinished) : 
                event.filter(isEventFinished);
        } else if(selectedStatus === 'canceled') {
            filteredEvents = isSearching ? 
                searchResults.filter((item) => item.isCancelled === true) : 
                event.filter((item) => item.isCancelled === true);
        }
        else {
            return []; // Pastikan mengembalikan array kosong jika tidak ada status yang cocok
        }

        const sortedEvents = [...filteredEvents];

        // Sort filtered events berdasarkan selectedSort
        sortedEvents.sort((a, b) => {
            const aDate = new Date(a[selectedSort]);
            const bDate = new Date(b[selectedSort]);
            return aDate - bDate; // Ascending order
        });

        return sortedEvents || []; // Kembalikan filteredEvents atau array kosong
    };

    const filteredEvents = events();
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto h-[120vh] py-16">
            <EventHeader />
            <div className="relative w-full flex justify-center mb-10 space-x-4 items-center">
                <EventSearch
                    onSearchResults={onSearchResults}
                    setIsSearching={setIsSearching}
                    setSearchTerm={setSearchTerm} // Pass searchTerm setter to EventSearch
                />
                <EventFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />
            </div>
            <EventGrid
                events={paginatedEvents} // Pass the paginated events to EventGrid
                status={status}
                onEventClick={handleEventDetail}
            />
            <EventPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <EventDetailModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeDialog={() => setIsOpen(false)}
                selectedEvent={selectedEvent}
            />
        </div>
    );
};

export default EventsPage;