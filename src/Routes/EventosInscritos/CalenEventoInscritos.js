import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import esLocale from "moment/locale/es";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import "@fullcalendar/list/main.css";
import React, { useEffect, useState } from "react";

const CalenEventoInscritos = () => {
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    if (calendar) {
      calendar.destroy();
    }

    const calendarEl = document.getElementById("myCalendar");
    const newCalendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      locale: "es",
      localeFallbacks: [esLocale],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      events: [
        {
          title: "Evento 1",
          start: "2022-06-01T10:00:00",
          end: "2022-06-01T11:00:00",
        },
        {
          title: "Evento 2",
          start: "2022-06-05T14:30:00",
          end: "2022-06-05T16:30:00",
        },
      ],
    });

    setCalendar(newCalendar);

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, []);

  return <div id="myCalendar" />;
};

export default CalenEventoInscritos;
