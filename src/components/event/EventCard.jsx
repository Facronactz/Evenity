import React from 'react';

const EventCard = ({event, onClick}) => {
    const isEventPast = new Date(event.startDate) < new Date();

    return (
        <div
            onClick={onClick}
            className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left flex flex-col justify-between transition hover:scale-105"
        >
            <div>
                <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
                <div>
                    <p className="text-xl">{event.startDate}</p>
                    <p className="text-xl">
                        {event.city}, {event.province}
                    </p>
                </div>
            </div>
            <button
                className={`
          ${isEventPast ? 'bg-[#FF5500]' : 'bg-[#00AA55]'} 
          text-white py-3 px-8 rounded-[30px] mt-12 font-bold text-xl
        `}
            >
                {isEventPast ? 'Not Yet Started' : 'Finished'}
            </button>
        </div>
    );
};

export default EventCard;