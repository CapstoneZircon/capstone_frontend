import React, {useState} from "react";
import DatePicker from "react-widgets/DatePicker";
import 'react-widgets/styles.css';

const Datetest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleDateChange(date : any) {
    setSelectedDate(date);
  }

  return (
    <div>
      <DatePicker 
        value={selectedDate} 
        onChange={handleDateChange} 
        formats={{ date: 'MM/DD/YYYY'}} 
        placeholder="Select a date"
      />
    </div>
  );
};

export default Datetest;
