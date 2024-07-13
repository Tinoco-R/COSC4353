import React from "react";

export function hasOnlyNumbers(value) {
  for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (isNaN(element)) {
          return false;
      }
  }
  return true;
}

export default class Input extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        active: (props.locked && props.active) || false,
        value: props.value || "",
        error: props.error || "",
        label: props.label || "Label"
      };
    }

    isEmpty(value) {
      return value === undefined || value === null || value.trim().length === 0;
    }

    changeValue(event) {
        let value = event.target.value;
        let id = event.target.id;

        //console.log(id, value);
        // Required fields
        if ((id === "eventName" || id === "eventDescription" || id === "eventAddress" || id === "eventCity" || id === "eventState" || id === "eventZip" || id === "eventSkills" || id === "eventUrgency")) {
          if (value.length === 0) {
            this.setState({ value, error: "This field cannot be empty." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});              
          }
        }

        // Event must be 100 characters or fewer
        if (id === "eventName") {
          if (value.length > 100) {
            this.setState({ value, error: "Name cannot exceed 100 characters." });
          }
          else if (value.length === 0) {
            this.setState({ value, error: "This field cannot be empty." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }
        
        // Description is a text area allowing only alphanumeric characters
        if (id === "eventDescription") {
          const regex = /^[A-Za-z0-9'\/]+$/;
          if (!regex.test(value) && value !== "") {
            this.setState({ value, error: "Invalid characters in description. Only 'A-Z', 'a-z', '0-9'." });
          }
          else if (value.length === 0) {
            this.setState({ value, error: "This field cannot be empty." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }

        // Addresses are limited to a set of legal characters.
        else if (id === "eventAddress") {
          const regex = /^[A-Za-z0-9.\-'#@%&\/\s]+$/;

          if (!regex.test(value) && value !== "") {
            this.setState({ value, error: "Invalid characters in address. Only 'A-Z', 'a-z', '0-9', \" \' \', ., #, -, @, %, &, / \"." });
          }
          else if (!regex.test(value)) {
            this.setState({ value, error: "This field cannot be empty." });
          }
          else if (/^[^A-Za-z0-9]/.test(value)) {
            this.setState({ value, error: "First character cannot be a symbol." });
        }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }
        
        // Cities are limited to a set of legal characters.
        else if (id === "eventCity") {
          const regex = /^[A-Za-z.\-\/]+$/;

          if (!regex.test(value) && value !== "") {
            this.setState({ value, error: "Invalid characters in address. Only 'A-Z', 'a-z', '., /, -'." });
          }
          else if (value === "") {
            this.setState({ value, error: "This field cannot be empty." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }

        // Zip-code must be a numeric-value
        else if (id === "eventZip") {
          if (!hasOnlyNumbers(value) || value.length > 5) {
            this.setState({ value, error: "Zip Code must be a 5 length string of numbers." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }

        // Date: Must be a future or present date.
        else if (id === "eventDate") {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split('T')[0];
          
          if (value <= formattedDate) {
              this.setState({ value, error: "Must be a future date." });
          }
          else {
            this.setState({ value, error: "" });
            this.setState({ value: value }, () => {});
          }
        }

        // Start-Time: Must follow time format.
        else if (id === "eventStart") {
            let regex = new RegExp(/^((0[1-9]|1[0-2]):(\d{2}) ?([AP][M]))$/);

            if (!regex.test(value) && value !== "") {
              this.setState({ value, error: "Time format: HH:MM AM/PM (12-Hour Clock)" });
            }
            else {
              this.setState({ value, error: "" });
            }
        }
        
        this.props.onChange(id, value, this.state.error);
    }

    handleKeyPress(event) {
      if (event.which === 13) {
        this.setState({ value: this.props.predicted });
      }
    }
  
    render() {
      const { active, value, error, label } = this.state;
      const { predicted, locked, id, type, name, readOnly } = this.props;
      const fieldClassName = `field ${locked? "locked" : (active || value? "active" : "")}`;
  
      return (
        <div className={fieldClassName}>
          {active &&
            value &&
            predicted &&
            predicted.includes(value) && <p className="predicted">{predicted}</p>}
          <input
            id={id}
            type={type}
            value={value}
            name={name}
            placeholder={"Enter " + label}
            onChange={this.changeValue.bind(this)}
            onKeyDown={this.handleKeyPress.bind(this)}
            onFocus={() => !locked && this.setState({ active: true })}
            onBlur={() => !locked && this.setState({ active: false })}
            readOnly={readOnly}
          />
          <label htmlFor={id} className={error && "error"}>
            {error || label}
          </label>
        </div>
      );
    }
  }