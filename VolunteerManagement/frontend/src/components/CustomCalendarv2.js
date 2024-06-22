import React from 'react';
import { render } from "react-dom";

import Calendar from '@toast-ui/react-calendar';

//import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Stylesheet for calendar

// Imports needed for the pop up in the calendar;
// however, I will add the css files themselves
// to the Django static folder because I previously
// attempted to import the css files for another
// component but I would get issues (it would
// mess up the code

// Load css files of tui-date-picker and tui-time-picker to use the event form popup.
//import 'tui-date-picker/dist/tui-date-picker.css';
//import 'tui-time-picker/dist/tui-time-picker.css';


var offset = null;
    
const months_array = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

var current_date = new Date();
var current_year = current_date.getFullYear();


var month_index = 5;
var month_displayed = months_array[month_index];


const calendars = [{
  id: 'cal1',
  name: 'Cleaning Event',
  color: '#ffffff',
  borderColor: '#9e5fff',
  backgroundColor: '#9e5fff',
  dragBackgroundColor: '#9e5fff', 
}];

const initialEvents = [
  {
    id: '1',
    calendarId: 'cal1',
    title: 'Lunch',
    category: 'time',
    start: '2024-06-28T12:00:00',
    end: '2024-06-28T13:30:00',
  },
  {
    id: '2',
    calendarId: 'cal1',
    title: 'Coffee Break',
    category: 'time',
    start: '2024-06-28T15:00:00',
    end: '2024-06-28T15:30:00',
  },
];

const onAfterRenderEvent = (event) => {
  console.log(event.title);
};

// from API docs
function moveToNextOrPrevRange(offset_local) {
    offset = offset_local;
  if (offset === -1){

    this.prev();
    console.log("offset -1");
  }
  else if (offset === 1){
    
    this.next();
    console.log("offset 1");
  }
}

function changeMonthIndex(inputString){

  if (inputString == '+1'){
    if (month_index < 11){
      month_index += 1;
    }
    else if (month_index == 11) {
      month_index = 0;
      current_year += 1;
    }
    else {
      throw new Error("Something went wrong trying to change the month_index to the next month");
      console.log("Something went wrong trying to change the month_index to the next month");
    }
  }
  else if (inputString == '-1'){
    if (month_index > 0){
      month_index -= 1;
    }
    else if (month_index == 0) {
      month_index = 11;
      current_year -= 1;
    }
    else {
      throw new Error("Something went wrong trying to change the month_index to the next month");
      console.log("Something went wrong trying to change the month_index to the previous month");
    }
  }
  console.log(month_index);
}

// BLock below commented out because not working

const template = {
  popupStateBusy() {
    return 'Attending';
  },
}




export class CustomCalendar extends React.Component{


  
  calendarRef = React.createRef();


    setCalendarOptions = () => {
      const calendarInstance = this.calendarRef.current.getInstance();
      calendarInstance.setOptions({
        template: {
          popupStateBusy() {
            return 'Attending';
          },
        },
      });
    }


    handleClickNextButton = () => {
      
      const calendarInstance = this.calendarRef.current.getInstance();
      
      try {
        changeMonthIndex('+1');
      }
      catch (e) {
        console.error(e);
      }

      var month_title = document.getElementById("current_month_title");

      month_title.innterHTML = "";
      month_title.innerHTML = `${months_array[month_index] + ' ' + current_year}`;
      
      calendarInstance.next();
      
    };

    // the prevbutton function, I implemented it using the
    // nextbutton "template"
    handleClickPrevButton = () => {
      const calendarInstance = this.calendarRef.current.getInstance();
      
      try {
        changeMonthIndex('-1');
      }
      catch (e) {
        console.error(e);
      }


      var month_title = document.getElementById("current_month_title");

      month_title.innerHTML = "";
      month_title.innerHTML = `${months_array[month_index] + ' ' + current_year}`;
      calendarInstance.prev();
    
    }




  

  render(){
    return(
          <>        
          {/*<h2>{month_displayed}</h2>*/}

          <div className='eventsCalendar'> 
          <h2 id="current_month_title">{month_displayed + ' ' + current_year}</h2>       
          <Calendar 
              ref={this.calendarRef} /* https://github.com/nhn/toast-ui.react-calendar/blob/master/README.md */
              usageStatistics={false}
              height="900px"
              view="month"
              gridSelection={false}
              isReadOnly={true}
              month={{
              dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              visibleWeeksCount: 4,
              }}
              calendars={calendars}
              events={initialEvents}
              onAfterRenderEvent={onAfterRenderEvent}
              useFormPopup={true}
              useDetailPopup={true}
              template={template}
          />
          <button onClick={this.handleClickPrevButton}>Prev</button>
          <button onClick={this.handleClickNextButton}>Next</button>
          
          
          </div>  
          </>
      );
  }

};



//const calendarDiv = document.getElementById("calendar");
//render(<CustomCalendar />, calendarDiv);

//export { CustomCalendar };