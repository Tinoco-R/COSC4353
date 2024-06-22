import React from "react";

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

    handleValidityChange = (isValid) => {
        console.log(isValid? 'Input is valid' : 'Input is not valid');
    }

    changeValue(event) {
        let value = event.target.value;
        let type = event.target.type;
        let isValid = true;

        if (!value.trim() && (event.target.id === "eventName" || event.target.id === "eventDescription" || event.target.id === "eventAddress" || event.target.id === "eventCity" || event.target.id === "eventState" || event.target.id === "eventZip" || event.target.id === "eventSkills" || event.target.id === "eventUrgency")) {
            this.setState({ value, error: "This field cannot be empty." });
            isValid = false;
        }

        else {
            this.setState({ value, error: "" });
        }
         if (this.props.onValidityChange()){
            this.props.onValidityChange(isValid);
         }
    }

    handleKeyPress(event) {
      if (event.which === 13) {
        this.setState({ value: this.props.predicted });
      }
    }
  
    render() {
      const { active, value, error, label } = this.state;
      const { predicted, locked, id, type, name } = this.props;
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
          />
          <label htmlFor={id} className={error && "error"}>
            {error || label}
          </label>
        </div>
      );
    }
  }