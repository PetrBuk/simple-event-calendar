import { checkAllDayEvent } from '@project/utils/timeHelpers'
import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.coerce.date().or(z.string().datetime()),
  end: z.coerce.date().or(z.string().datetime()),
  color: z.string().default('#4286F6'),
  allDay: z.boolean().optional(),
}).refine(event => {
  const start = new Date(event.start).getTime()
  const end = new Date(event.end).getTime()
  return start < end
}, {
  message: 'End of the event have to be after the start',
  path: ['end'],
}).transform((event) => {
  const isAllDay = checkAllDayEvent(new Date(event.start), new Date(event.end))
  if (isAllDay) {
    return { ...event, allDay: true }
  }
  return event
})

export type Event = z.infer<typeof eventSchema>
