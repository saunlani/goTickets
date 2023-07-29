import React, { useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Stack, Box, Collapse } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../services/getEvents.js';
import Grow from '@mui/material/Grow';
import { EventResult } from '../../interfaces/index.js';

export const EventViewer = () => {
  const { isLoading, error, data, refetch, isFetching } = useQuery({ queryKey: ['events', 20], queryFn: ({ queryKey }) => getEvents(queryKey[1]) });

  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
  const [expandedTickets, setExpandedTickets] = useState<{ [key: number]: boolean }>({});

  const handleRefresh = () => {
    void refetch();
  };

  const handleExpandClick = (eventId: number) => {
    setOpenRows({
      ...openRows,
      [eventId]: !openRows[eventId],
    });
  };

  const handleExpandTicketsClick = (eventId: number) => {
    setExpandedTickets({
      ...expandedTickets,
      [eventId]: !expandedTickets[eventId],
    });
  };

  if (isLoading || isFetching) return <CircularProgress />;

  if (error) return (
    <Grow in={true}>
      <Stack alignItems='center' spacing={2}>
        <Typography variant='h5' color='white'>
          An error has occurred, please try again.
        </Typography>
        <IconButton
          aria-label='refresh'
          size='large'
          role='button'
          color='success'
          name='refresh'
          sx={{ fontSize: '80px' }}
          onClick={handleRefresh}
        >
          <RefreshIcon color='warning' fontSize='inherit' />
        </IconButton>
      </Stack>
    </Grow>
  );

  if (data) return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Tickets</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((event: EventResult) => (
            <React.Fragment key={event.id}>
              <TableRow>
                <TableCell component="th" scope="row">
                  {event.title}
                </TableCell>
                <TableCell align="right">{new Date(event.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">{event.city}</TableCell>
                <TableCell align="right">{event.tickets.length}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label='expand'
                    size='small'
                    onClick={() => {
                      if (event && event.id !== undefined) {
                        handleExpandClick(event.id);
                      }
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                  <Collapse in={event && event.id ? openRows[event.id] : false} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">Tickets</Typography>
                      {event && event.id && event.tickets.slice(0, expandedTickets[event.id] ? event.tickets.length : 10).map((ticket, index) => (
                        <Box key={index} marginBottom={2} marginLeft={.3}>
                          <Typography sx={{ fontWeight: 'bold' }} variant='body2'>Ticket {index + 1}</Typography>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant='body2'>Barcode: </Typography>
                            &nbsp;{ticket.barcode}
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant='body2'>First Name: </Typography>
                            &nbsp;{ticket.firstName}
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant='body2'>Last Name: </Typography>
                            &nbsp;{ticket.lastName}
                          </Box>
                        </Box>
                      ))}
                      {event.tickets.length > 10 &&
                        <IconButton
                          onClick={() => {
                            if (event && event.id !== undefined) {
                              handleExpandTicketsClick(event.id);
                            }
                          }}
                        >
                          {event && event.id && expandedTickets[event.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  else return null;
};
