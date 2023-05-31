import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = [
  { title: 'Meeting', start: new Date() }
]

export function CalendarEventosInscritos() {
    const handleDateClick = (arg) => {
        // Log de la fecha seleccionada
        console.log(arg.date);
      };
    
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        locale={'es'}
        eventClick={(e) => {
            console.log("click");
            console.log(e);
        }}
        dateClick={() => {
            alert('click')
        }}
        moreLinkClick={() => {
            console.log("otro click");
        }}
        headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
        }}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}