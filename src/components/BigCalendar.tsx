"use client";
import { Calendar, momentLocalizer, Views, View, Event } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ data }: { data: { title: string; start: Date; end: Date }[] }) => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);

    const handleViewChange = (selectedView: View) => {
        setView(selectedView);
    }

    // Custom date formats to show day names instead of dates
    const formats = {
        dayFormat: (date: Date, culture?: string, localizer?: any) =>
            localizer.format(date, 'ddd', culture), // Mon, Tue, Wed, etc.
        dayHeaderFormat: (date: Date, culture?: string, localizer?: any) =>
            localizer.format(date, 'dddd', culture), // Monday, Tuesday, etc.
        dayRangeHeaderFormat: () => 'Weekly Schedule', // Custom header for week view
    };

    // Custom event style getter
    const eventStyleGetter = (event: Event) => {
        const colors = [
            { background: '#3b82f6', border: '#2563eb' }, // blue
            { background: '#8b5cf6', border: '#7c3aed' }, // purple
            { background: '#ec4899', border: '#db2777' }, // pink
            { background: '#10b981', border: '#059669' }, // green
            { background: '#f59e0b', border: '#d97706' }, // amber
            { background: '#06b6d4', border: '#0891b2' }, // cyan
        ];

        // Use title hash to consistently assign colors
        const titleStr = String(event.title || '');
        const hash = titleStr.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const color = colors[hash % colors.length];

        return {
            style: {
                backgroundColor: color.background,
                borderColor: color.border,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '6px',
                color: 'white',
                padding: '4px 8px',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
            }
        };
    };

    // Custom event component for better display
    const CustomEvent = ({ event }: { event: Event }) => {
        return (
            <div className="flex flex-col h-full overflow-hidden">
                <div className="font-semibold text-xs truncate">{event.title}</div>
                <div className="text-[10px] opacity-90 mt-0.5">
                    {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
                </div>
            </div>
        );
    };

    // Custom toolbar component without navigation buttons
    const CustomToolbar = (toolbar: any) => {
        return (
            <div className="rbc-toolbar">
                <span className="rbc-toolbar-label">Weekly Schedule</span>
                <span className="rbc-btn-group">
                    <button
                        type="button"
                        onClick={() => toolbar.onView('work_week')}
                        className={toolbar.view === 'work_week' ? 'rbc-active' : ''}
                    >
                        Week
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView('day')}
                        className={toolbar.view === 'day' ? 'rbc-active' : ''}
                    >
                        Day
                    </button>
                </span>
            </div>
        );
    };

    return (
        <>
            <Calendar
                localizer={localizer}
                events={data}
                startAccessor="start"
                endAccessor="end"
                views={["work_week", "day"]}
                view={view}
                style={{ height: '98%' }}
                onView={handleViewChange}
                min={new Date(2024, 0, 1, 8, 0, 0)}
                max={new Date(2024, 0, 1, 17, 0, 0)}
                formats={formats}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CustomEvent,
                    toolbar: CustomToolbar,
                }}
                step={30}
                timeslots={2}
                dayLayoutAlgorithm="no-overlap"
                date={new Date(2024, 0, 1)}
                onNavigate={() => { }} // Disable navigation since we show a fixed week
            />
            <style jsx global>{`
                /* Calendar container styling */
                .rbc-calendar {
                    font-family: inherit;
                }

                /* Header styling */
                .rbc-header {
                    padding: 12px 4px;
                    font-weight: 600;
                    color: #374151;
                    border-bottom: 2px solid #e5e7eb;
                    background-color: #f9fafb;
                }

                .rbc-today {
                    background-color: #eff6ff;
                }

                /* Time slot styling */
                .rbc-time-slot {
                    border-top: 1px solid #f3f4f6;
                }

                .rbc-timeslot-group {
                    min-height: 60px;
                    border-left: 1px solid #e5e7eb;
                }

                .rbc-time-gutter {
                    white-space: nowrap;
                }

                .rbc-label {
                    font-size: 12px;
                    color: #6b7280;
                    padding: 0 8px;
                }

                /* Event styling improvements */
                .rbc-event {
                    padding: 4px 6px !important;
                    border-radius: 6px !important;
                    border: none !important;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
                }

                .rbc-event:hover {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15) !important;
                    transform: translateY(-1px);
                    z-index: 10 !important;
                }

                .rbc-event.rbc-selected {
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5) !important;
                }

                .rbc-event-label {
                    display: none;
                }

                .rbc-event-content {
                    font-size: 13px;
                    line-height: 1.3;
                    white-space: normal;
                    overflow: visible;
                }

                /* Toolbar styling */
                .rbc-toolbar {
                    padding: 16px 0;
                    margin-bottom: 16px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .rbc-toolbar-label {
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    flex: 1;
                    text-align: center;
                    min-width: 200px;
                }

                .rbc-toolbar button {
                    padding: 6px 14px;
                    border: 1px solid #d1d5db;
                    background-color: white;
                    color: #374151;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .rbc-toolbar button:hover {
                    background-color: #f3f4f6;
                    border-color: #9ca3af;
                }

                .rbc-toolbar button.rbc-active {
                    background-color: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                }

                .rbc-toolbar button.rbc-active:hover {
                    background-color: #2563eb;
                    border-color: #2563eb;
                }

                /* Current time indicator */
                .rbc-current-time-indicator {
                    background-color: #ef4444;
                    height: 2px;
                }

                /* Day view specific */
                .rbc-day-slot .rbc-time-slot {
                    border-top: 1px solid #f3f4f6;
                }

                /* Overlapping events handling */
                .rbc-addons-dnd .rbc-addons-dnd-resizable {
                    position: relative;
                }

                .rbc-events-container {
                    margin-right: 0;
                }

                /* Better spacing for overlapping events */
                .rbc-day-slot .rbc-event {
                    border: 2px solid white !important;
                }

                /* Week view column styling */
                .rbc-time-column {
                    min-height: 100%;
                }

                .rbc-time-content {
                    border-top: 2px solid #e5e7eb;
                }

                /* Responsive improvements */
                @media (max-width: 768px) {
                    .rbc-toolbar {
                        flex-direction: column;
                    }
                    
                    .rbc-toolbar-label {
                        order: -1;
                        margin-bottom: 8px;
                    }
                    
                    .rbc-toolbar button {
                        font-size: 12px;
                        padding: 4px 10px;
                    }
                }
            `}</style>
        </>
    );
};

export default BigCalendar;