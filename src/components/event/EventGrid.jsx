import {Skeleton} from "@/components/ui/skeleton";
import EventCard from './EventCard';

const EventGrid = ({events, status, onEventClick}) => {
    if (status === "loading") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
                {Array.from({length: 8}).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="px-12 py-8 text-white rounded-[40px] shadow-xl"
                        style={{height: "350px", width: "100%"}}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                />
            ))}
        </div>
    );
};

export default EventGrid;