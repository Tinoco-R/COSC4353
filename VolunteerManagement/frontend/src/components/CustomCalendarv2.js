//import React from 'react';
import * as React from 'react';
import { render } from "react-dom";

import Calendar from '@toast-ui/react-calendar';


// Imports needed for the material UI popup modal
//import Dialog from '@mui/material/Dialog';
//import DialogTitle from '@mui/material/DialogTitle';

// from: https://github.com/jonatanklosko/material-ui-confirm/?tab=readme-ov-file
import { ConfirmProvider } from 'material-ui-confirm';
import Button from 'react-multi-date-picker/components/button';
import { useConfirm } from 'material-ui-confirm';
//////////////

import Swal from 'sweetalert2';

import DialogComponent from './DialogComponent';
import './DialogComponent';


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

//const popupCall = () => {
//  return(
//    <PopupComponent />
//  );
//};

const clickEventHandler = (event) => {
  console.log('clickEventHandler triggered');
  // the event id of the event that was clicked is included in the event object
  // guide: https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md#clickevent
  console.log(event);

  //popupCall();
  //<popupComponent />;

  // credit, examples at: https://sweetalert2.github.io/
  Swal.fire({
    title: '<h5> Event details </h5>',
    text: 'Cleaning event on June 30, 2024 at 10:00 am',
    /*icon: 'warning',*/
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancel Attendance"
  }).then((result) => {
    if (Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Confirmed',
        text: 'Your attendance to this event has been cancelled.',
        icon: 'success'
      });

      // Remove the user from the attendees to the event and Update the screen
      // Considering that this function could be removed... you can't be penalized
      // for not having it because it was not required


    }
  });

}

// Link might be useful:
// https://stackoverflow.com/questions/57611199/i-need-to-show-a-react-material-ui-confirmation-dialog-box-or-a-sweet-alert-conf



//Popup component

const PopupComponent = () => {
  return(
      <ConfirmProvider>
        <p>pop up</p>
      </ConfirmProvider>
  );
};

/******************************************************************** */


//import { Button as Button2 } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DialogComponentLocal = () => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  return(
    <React.Fragment>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Event details"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id='alert-dialog-description'>
                To subscribe, pay 10.00
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Will not attend</Button>
            <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>
    
    </React.Fragment>
  )

}
/**************************************************************************8 */


// Calendar component

export class CustomCalendar extends React.Component{


  /***************************************** */


  /***************************************** */
  
  
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

    helper_function = () => {
      const cal = this.calendarRef.current.getInstance();
      // Attempting to show my own popup modals for the events in the calendar
      cal.on({
        'clickSchedule': function(e) {
          console.log('clickSchedule triggered', e);
        }
      })

      console.log('helper_function ran');
    }

    helper_function;

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



    
    };











  

  render(){
    return(
          <>        
          {/*<h2>{month_displayed}</h2>*/}

          
          <h2 id="current_month_title">{month_displayed + ' ' + current_year}</h2>       
          <div className='eventsCalendar'> 
          <Calendar 
              ref={this.calendarRef} /* https://github.com/nhn/toast-ui.react-calendar/blob/master/README.md */
              usageStatistics={false}
              height="100%"
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
              useFormPopup={false}
              useDetailPopup={false}
              template={template}
              onClickEvent={clickEventHandler}
              
          />
          <button className='monthNavigationButtons' onClick={this.handleClickPrevButton}>Prev</button>
          <button className='monthNavigationButtons' onClick={this.handleClickNextButton}>Next</button>
          
          
          </div>
          






          {/*<PopupComponent />*/}
          </>
      );
  }

};



//const calendarDiv = document.getElementById("calendar");
//render(<CustomCalendar />, calendarDiv);

//export { CustomCalendar };