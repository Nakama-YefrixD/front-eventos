import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Button, Modal } from 'antd';

const events = [
  { title: 'Meeting', start: new Date() }
]

export function CalendarEventosInscritos(props) {
    const handleDateClick = (arg) => {
        // Log de la fecha seleccionada
        console.log(arg.date);
    };

    const eventos = props.eventos

    const [showModal, setShowModal] = useState(false)
    const [eventoSeleccionado, setEventoSeleccionado] = useState({})

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={eventos}
                eventContent={renderEventContent}
                locale={'es'}
                eventClick={(e) => {
                    
                    const evento_select = eventos.find(event => event.codigo === e.event._def.extendedProps.codigo)
                    // console.log(e.event._def.extendedProps.codigo);
                    // console.log(evento_select);
                    setEventoSeleccionado(evento_select)
                    setShowModal(true)

                    
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

            {
                showModal == true
                ?<Modal 
                    title={"Evento: "+eventoSeleccionado.title}
                    open={() => {

                    }} 
                    onOk={() => {
                        setShowModal(false)
                    }} 
                    onCancel={() => {
                        setShowModal(false)
                    }}
                >
                    {
                        eventoSeleccionado.tipoensenanza == "Virtual"
                        ?<>
                            <div>El evento sera de manera virutal, para poder ingresar click en el siguiente enlace:</div><br/>
                            <div><b>Link:</b> <a style={{color:'blue'}} href={eventoSeleccionado.zoom} target="_blank">{eventoSeleccionado.zoom}</a></div>

                        </>
                        :<>
                            <div>El evento sera de manera presencial, aquí tienes la información necesaria para ingresar:</div><br/>
                            {/* <div><b>Auditorio:</b> {eventoSeleccionado.auditoria}</div> */}
                            <div><b>Lugar:</b> {eventoSeleccionado.auditoria}</div>
                            <div><b>Sede:</b> {eventoSeleccionado.sede}</div>
                        </>
                    }
                </Modal>
                :null
            }
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