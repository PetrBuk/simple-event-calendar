import { Event } from '@project/types/events'

const initialEvents: Event[] = [
  {
    id: 'g4j1yd9k6',
    title: 'Product Launch',
    start: '2023-06-10T09:00:00.000',
    end: '2023-06-10T11:30:00.000',
    color: '#A2D8B1'
  },
  {
    id: '2ld4c3b8j',
    title: 'Team Building Activity',
    start: '2023-06-10T13:00:00.000',
    end: '2023-06-10T14:30:00.000',
    color: '#F57C00',
  },
  {
    id: 'x5fhqz2ps',
    title: 'Client Meeting',
    start: '2023-06-10T16:30:00.000',
    end: '2023-06-10T18:00:00.000',
    color: '#4286F4'
  },
  {
    id: 'k2sj5g4h1',
    title: 'Project Deadline',
    start: '2023-06-11T10:00:00.000',
    end: '2023-06-11T12:00:00.000',
    color: '#C28DD7'
  },
  {
    id: 'i7x8m3p4k',
    title: 'Team Standup Meeting',
    start: '2023-06-11T14:30:00.000',
    end: '2023-06-11T15:00:00.000',
    color: '#FF9800'
  },
  {
    id: 'n5c3y1h8f',
    title: 'Client Presentation',
    start: '2023-06-11T16:30:00.000',
    end: '2023-06-11T18:00:00.000',
    color: '#E91E63'
  },
  {
    id: 'b8j2k5d4c',
    title: 'Conference Call',
    start: '2023-06-12T09:00:00.000',
    end: '2023-06-12T10:00:00.000',
    color: '#9C27B0'
  },
  {
    id: 'r3w6k1j4f',
    title: 'Team Lunch',
    start: '2023-06-12T12:30:00.000',
    end: '2023-06-12T13:30:00.000',
    color: '#4CAF50'
  },
  {
    id: 'p5f9k2s3j',
    title: 'Project Review',
    start: '2023-06-12T15:00:00.000',
    end: '2023-06-12T16:30:00.000',
    color: '#FF5722'
  },
  {
    id: 't4l6k8j2p',
    title: 'Team Training',
    start: '2023-06-13T10:30:00.000',
    end: '2023-06-13T12:00:00.000',
    color: '#219'
  }
]

export const getEvents = async () => {
  return initialEvents
}
