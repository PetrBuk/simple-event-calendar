'use client'

import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import styled from '@emotion/styled'

import { Event, eventSchema } from '@project/types/events'

interface EventEditDialogProps {
  event?: Partial<Event>
  isOpen: boolean,
  onClose: () => void,
  onEventEdit: (data: Event) => void,
  onEventCreate: (data: Event) => void,
  onEventDelete: (event: Event) => void,
}

const EventEditDialog: React.FC<EventEditDialogProps> = ({
  event,
  isOpen,
  onClose,
  onEventEdit,
  onEventCreate,
  onEventDelete,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    values: {
      id: event?.id || '',
      title: event?.title || '',
      start: event?.start || '',
      end: event?.end || '',
      color: event?.color || '#4286F6',
    },
    resolver: zodResolver(eventSchema),
  })

  const handleFormSubmit: SubmitHandler<Event> = (data) => {
    const parseResult = eventSchema.safeParse(data)
    if (parseResult.success) {
      if (data.id.length) {
        onEventEdit(parseResult.data)
      } else {
        onEventCreate(parseResult.data)
      }
    }
  }

  return (
    <Dialog onClose={onClose} open={isOpen} fullWidth maxWidth={'sm'}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>
          Edit event data
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 32,
              top: 32,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FieldsWrapper>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} label="Title" required />}
            />
            <Controller
              name="start"
              control={control}
              render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} label="Start" type="datetime-local" required />}
            />
            <Controller
              name="end"
              control={control}
              render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} label="End" type="datetime-local" required />}
            />
            <Controller
              name="color"
              control={control}
              render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} label="Color" type="color" />}
            />
          </FieldsWrapper>
        </DialogContent>
        <DialogActions>
          {event?.id?.length && (
            <Button
              type="button"
              color="error"
              onClick={() => onEventDelete(event as Event)}
              sx={{ marginRight: 'auto' }}
            >
              Delete
            </Button>
          )}
          <Button type="submit">Save</Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default EventEditDialog

const Form = styled('form')`
  padding: 2rem;
`

const FieldsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`
