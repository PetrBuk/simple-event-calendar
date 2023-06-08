'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


const SimpleCalendar = () => {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin
      ]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      nowIndicator={true}
      editable={true}
      selectable={true}
      selectMirror={true}
      initialEvents={[
        { title: 'nice event', start: new Date(), resourceId: 'a' }
      ]}
    />
  )
}

export default SimpleCalendar
