import React from 'react';
import ReactDOM from 'react-dom';

/* ES6 module in Node.js environment */
//import Calendar from '@toast-ui/react-calendar/ie11';


//import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Stylesheet for calendar
import GenericButton from './GenericButton';

//import CustomCalendar from './CustomCalendarv2';

export function EventsCalendar() {

  return (
    <>
    <div className='eventsCalendar'>
      
      
      <GenericButton text={"prev"} />  {/* onclick={moveToNextOrPrevRange(-1)} Credit: Jeshken on https://stackoverflow.com/questions/73110617/is-it-possible-to-add-an-onclick-event-in-another-component */}
      
      <GenericButton text={"next"} /> {/* onclick={moveToNextOrPrevRange(1)} /> */}
      
      
    </div>
    </>
  );
}

//const root = ReactDOM.createRoot(document.getElementById('calendar'));
//root.render(<CustomCalendar />)

//const tmp = ReactDOM.render(<CustomCalendar />, document.getElementById('calendar'));
