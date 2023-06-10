'use client'

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import csLocale from '@fullcalendar/core/locales/cs'
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core'

import { Event } from '@project/types/events'
import { getEvents } from '@project/services/events'
import { getHTMLFormat } from '@project/utils/timeHelpers'
import EventEditDialog from './EventEditDialog'

const SimpleCalendar = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event> | undefined>()
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  /** Get the events data (better use ReactQuery :)) */
  useEffect(() => {
    getEvents().then(res => setEvents(res))
  }, [])

  /** Open modal on event select */
  useEffect(() => {
    if (selectedEvent) {
      setIsEditOpen(true)
    } else {
      setIsEditOpen(false)
    }
  }, [selectedEvent])

  /** Handles click and drag inside calendar - open create dialog */
  const handleDateSelect = (event: DateSelectArg) => {
    setSelectedEvent({
      start: getHTMLFormat(event.start),
      end: getHTMLFormat(event.end),
    })
  }

  /** Handles event duration change */
  const handleEventResize = (args: EventResizeDoneArg) => {
    const editedEvent = args.event

    const newEvents = events.map(e => e.id === editedEvent.id ? {
      id: editedEvent.id,
      title: editedEvent.title,
      start: editedEvent.startStr,
      end: editedEvent.endStr,
      color: editedEvent.backgroundColor
    } : e)

    setEvents(newEvents)
  }

  /** Handles event select - open edit dialog */
  const handleEventClick = (args: EventClickArg) => {
    const event = args.event

    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: getHTMLFormat(event.start || new Date(event.startStr)),
      end: getHTMLFormat(event.end || new Date(event.endStr)),
      color: event.backgroundColor
    })
  }

  /** Handles dialog close without saving */
  const handleDialogClose = () => {
    setSelectedEvent(undefined)
    setIsEditOpen(false)
  }

  /** Update the events list */
  const handleEventEdit = (editedEvent: Event) => {
    const newEvents = events.map(e => e.id === editedEvent.id ? {
      id: editedEvent.id,
      title: editedEvent.title,
      start: editedEvent.start,
      end: editedEvent.end,
      color: editedEvent.color
    } : e)
    setEvents(newEvents)
    handleDialogClose()
  }

  /** Add new event to the list */
  const handleEventCreate = (newEvent: Event) => {
    const newEvents = [...events]
    newEvents.push({
      id: Math.random().toString(36).substring(2, 9),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      color: newEvent.color,
      allDay: newEvent.allDay,
    })
    setEvents(newEvents)
    handleDialogClose()
  }

  /** Remove the event */
  const handleEventDelete = (event: Event) => {
    const newEvents = events.filter(e => e.id !== event.id)
    setEvents(newEvents)
    handleDialogClose()
  }

  return (
    <>
      <FullCalendar
        height="100%"
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        locales={[csLocale]}
        locale={'cs'}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'today dayGridMonth,timeGridWeek prev,next'
        }}
        // Could change these two based on device size
        dayMaxEvents={3}
        eventMaxStack={2}
        firstDay={1}
        navLinks
        weekNumbers
        nowIndicator
        editable
        selectable
        selectMirror
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventResize={handleEventResize}
      />
      <EventEditDialog
        event={selectedEvent}
        isOpen={isEditOpen}
        onClose={handleDialogClose}
        onEventEdit={handleEventEdit}
        onEventCreate={handleEventCreate}
        onEventDelete={handleEventDelete}
      />
    </>
  )
}

export default SimpleCalendar
