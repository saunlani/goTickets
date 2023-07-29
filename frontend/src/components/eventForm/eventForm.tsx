import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { addEvent } from '../../services/addEvent.js';
import { EventResult } from '../../interfaces/index.js';
import { useQueryClient } from '@tanstack/react-query';

export const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [tickets, setTickets] = useState([{ barcode: '', firstName: '', lastName: '' }]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showErrorMessage) {
      timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showErrorMessage]);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newEvent: EventResult) => addEvent(newEvent),
    onSuccess: async () => {
      setTitle('');
      setDate('');
      setCity('');
      setTickets([{ barcode: '', firstName: '', lastName: '' }]);
      await queryClient.invalidateQueries();
      setShowSuccessMessage(true);
    },
    onError: () => {
      setShowErrorMessage(true);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setShowErrorMessage(true);
      return;
    }
    const newTickets = tickets.filter((ticket) => ticket.barcode !== '');
    const newEvent: EventResult = {
      title,
      date,
      city,
      tickets: newTickets,
    };
    mutate(newEvent);
  };

  const handleTicketChange = (index: number, field: keyof typeof tickets[0], value: string) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };


  const addNewTicket = () => {
    setTickets([...tickets, { barcode: '', firstName: '', lastName: '' }]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
      }}
    >
      <Typography variant='h5'>New Event Form</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Event Title"
        name="title"
        autoComplete="title"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        name="date"
        label="Event Date"
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="city"
        label="Event City"
        type="text"
        id="city"
        autoComplete="current-city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {tickets.map((ticket, index) => (
        <Box key={index}>
          <Typography variant='h6'>New Ticket</Typography>
          <TextField
            margin="normal"
            fullWidth
            name="barcode"
            label="Barcode"
            type="text"
            id={`barcode-${index}`}
            value={ticket.barcode}
            onChange={(e) => handleTicketChange(index, 'barcode', e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id={`firstName-${index}`}
            value={ticket.firstName}
            onChange={(e) => handleTicketChange(index, 'firstName', e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id={`lastName-${index}`}
            value={ticket.lastName}
            onChange={(e) => handleTicketChange(index, 'lastName', e.target.value)}
          />
        </Box>
      ))}

      <Button onClick={addNewTicket}>
        Add another ticket
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Add Event'}
      </Button>

      <Snackbar open={showErrorMessage} autoHideDuration={30000} onClose={() => setShowErrorMessage(false)}>
        <Alert onClose={() => setShowErrorMessage(false)} severity="error">
          An error occurred while adding the event.
        </Alert>
      </Snackbar>

      <Snackbar open={showSuccessMessage} autoHideDuration={5000} onClose={() => setShowSuccessMessage(false)}>
        <Alert onClose={() => setShowSuccessMessage(false)} severity="success">
          Event added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
