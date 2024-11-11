import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEventDetail, setSelectedEvent} from "@/redux/slice/eventSlice";
import EventSearch from "@/components/event/EventSearch.jsx";
import EventGrid from "@/components/event/EventGrid.jsx";
import EventPagination from "@/components/event/EventPagination.jsx";
import EventDetailModal from "@/components/event/EventDetailModal.jsx";
import EventHeader from "@/components/event/EventHeader.jsx";
import {EventFilter} from "@/components/event/EventFilter.jsx";

const EventsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const dispatch = useDispatch();
    const {event, status, selectedEvent, totalPages, currentPage} = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(getEventDetail({page: currentPage}));
    }, [dispatch, currentPage]);

    const handleEventDetail = (selectedEvent) => {
        dispatch(setSelectedEvent(selectedEvent));
        setIsOpen(true);
    };

    const handlePageChange = (page) => {
        dispatch(getEventDetail({page}));
    };

    const onSearchResults = (searchResults) => {
        setSearchResults(searchResults);
    };

    // selected status
    const events = () => {
        if (selectedStatus === 'ALL') {
            return isSearching ? searchResults : event;
        } else if (selectedStatus === 'true') {
            return isSearching ? searchResults.filter((item) => item.status === true) : event.filter((item) => item.status === true);
        } else if (selectedStatus === 'false') {
            return isSearching ? searchResults.filter((item) => item.status === false) : event.filter((item) => item.status === false);
        }
        return []; // Ensure it always returns an array
    };

    const eventList = events(); // Call the events function

    return (
        <div className="container mx-auto h-[120vh] pt-16">
            <EventHeader/>
            <div className="relative w-full flex justify-center mb-10 space-x-4 items-center">
                <EventSearch
                    onSearchResults={onSearchResults}
                    setIsSearching={setIsSearching}
                />
                <EventFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>
            <EventGrid
                events={eventList} // Pass the eventList to EventGrid
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