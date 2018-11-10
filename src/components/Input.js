import React, { Component } from "react";

// The Input component is responsible for handling "change" events
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.setState({ newInput: ev.target.value });
  }

  render() {
    return (
      <input
        type={this.props.inputType}
        value={this.state.newInput}
        onChange={this.handleChange}
        tabIndex="1"
      />
    );
  }
}

export default Input;
