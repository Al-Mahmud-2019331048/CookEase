import React, { useEffect } from "react";
import { useState } from "react";
import {
 Card,
 CardContent,
 List,
 ListItem,
 ListItemText,
 ListItemIcon,
 TextField,
 Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import Header from "../components/Header";
import DateTimePicker from "../components/Contest/DateTimePicker";

import { Add, Close } from "@mui/icons-material";
import axios from "axios";

// Sample event data
// const events = [
//  {
//   id: 1,
//   name: "Event 1",
//   dateTime: "Aug 28, 2023, 2:00 PM",
//   location: "Venue 1",
//  },
// ];

const AddEventCard = ({ closeModal }) => {
 const [name, setName] = useState("");
 const [dateTime, setDateTime] = useState(new Date());
 const [location, setLocation] = useState("");

 const handleSave = async () => {
  // onSave({ name, dateTime, location, participants });
  const formData = {
   contest_name: name,
   contest_time: dateTime.toUTCString(),
   contest_venue: location,
   user_id: localStorage.getItem("user_id"),
  };
  await axios.post("http://localhost:8100/add_event", formData);
  setName("");
  setDateTime(new Date()); // Reset to the current date and time
  setLocation("");
  closeModal();
 };

 return (
  <div className="p-5 bg-white rounded-lg shadow-lg">
   <div className="flex flex-row justify-between border-b-2">
    <h2 className="text-2xl font-semibold mb-2">Add an Event</h2>
    <button
     className="p-2 rounded-full bg-gray-200 h-8 w-8 text-md text-gray-500 flex items-center justify-center"
     onClick={closeModal}>
     <Close />
    </button>
   </div>
   <CardContent>
    <List>
     <ListItem>
      <ListItemIcon>
       <EventIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <TextField
        label="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
       />
      </ListItemText>
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <LocationOnIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
       />
      </ListItemText>
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <DateTimePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
       />
      </ListItemText>
     </ListItem>
    </List>
    <button
     className="ml-5 bg-pink-600 p-3 text-white rounded-lg shadow-full"
     onClick={handleSave}>
     Add Event
    </button>
   </CardContent>
  </div>
 );
};

const EventCard = ({ event }) => {
 const [participated, setParticipated] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   const formData = {
    user_id: localStorage.getItem("user_id"),
    contest_id: event.contest_id,
   };
   const res = await axios.post(
    "http://localhost:8100/has_user_participated",
    formData
   );
   setParticipated(res.data.participated);
  };
  fetchData();
 }, []);

 const doParticipate = async () => {
  const formData = {
   user_id: localStorage.getItem("user_id"),
   contest_id: event.contest_id,
  };
  await axios.post("http://localhost:8100/participate", formData);
  setParticipated(true);
 };

 const doDeParticipate = async () => {
  const formData = {
   user_id: localStorage.getItem("user_id"),
   contest_id: event.contest_id,
  };
  await axios.post("http://localhost:8100/departicipate", formData);
  setParticipated(false);
 };

 return (
  <Card className="m-2 max-w-sm">
   <CardContent>
    <List>
     <ListItem>
      <ListItemIcon>
       <EventIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.contest_name} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.contest_time} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <LocationOnIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.contest_venue} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <GroupIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={`${event.participants} people joined`} />
     </ListItem>
     <ListItem>
      {participated && (
       <button
        className="w-full bg-gray-300 shadow text-gray-500 p-2 rounded-lg"
        onClick={doDeParticipate}>
        Cancel Participation
       </button>
      )}
      {!participated && (
       <button
        className="w-full bg-gray-300 shadow text-gray-500 p-2 rounded-lg"
        onClick={doParticipate}>
        Participate
       </button>
      )}
     </ListItem>
    </List>
   </CardContent>
  </Card>
 );
};

function Contests() {
 const [modal, setModal] = useState(false);
 const [contests, setContests] = useState([]);

 useEffect(() => {
  const fetchEvents = async () => {
   const res = await axios.get("http://localhost:8100/get_events");
   setContests(res.data);
  };
  fetchEvents();
 }, []);

 const openModal = () => {
  setModal(true);
 };

 const closeModal = () => {
  setModal(false);
 };
 return (
  <>
   <Header />
   {modal && (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
     <div className="relative">
      <AddEventCard closeModal={closeModal} />
     </div>
    </div>
   )}
   <div className="fixed right-10 bottom-10">
    <button
     className="w-8 h-8 rounded-full bg-pink-600 text-white"
     onClick={openModal}>
     <Add />
    </button>
   </div>
   <div className="bg-gray-100 min-h-screen py-8">
    <div className="container mx-auto">
     <div className="flex flex-wrap justify-center">
      {contests.map((event) => (
       <EventCard key={event.contest_id} event={event} />
      ))}
     </div>
    </div>
   </div>
  </>
 );
}

export default Contests;
