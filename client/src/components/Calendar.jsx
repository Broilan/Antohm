import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
  
export default function CalendarGfg() {
  const [value, onChange] = useState(new Date());
  
  return (
    <div style={{position:"absolute", display:"flex", alignItems:"center", backgroundColor:"#F2F2F2", height:"40%", width:"20vw",
    borderRadius:"50px", boxShadow:"0 0 15px", transform: "translate(389%, -110%)"}}>
    <div style={{position:"absolute", width:"110%"}}>
        <h3 style={{position:"absolute", left:"38%", top:"-19%"}}>Calendar</h3>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
    </div>
  );
}