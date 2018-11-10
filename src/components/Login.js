import React, { Component } from "react";
import { auth } from "../data/firebase";
import Input from "./Input";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorClass: "hidden",
      errorMessage: ""
    };
    this.messageDuration = 2500;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();

    let emailInput = "",
      passwordInput = "";
    const inputFields = ev.target.getElementsByTagName("input");
    // Capture field values at time of submission
    for (let i = 0; i < inputFields.length; i++) {
      switch (inputFields[i].getAttribute("type")) {
        case "email":
          emailInput = inputFields[i].getAttribute("value");
          break;
        case "password":
          passwordInput = inputFields[i].getAttribute("value");
          break;
        default:
      }
    }

    // Use captured values to login via Firebase
    if (emailInput.length < 1 || passwordInput.length < 1) {
      this.setState(
        {
          errorClass: "visible",
          errorMessage: "Fields cannot be empty"
        },
        () => {
          setTimeout(this.hideError, this.messageDuration);
        }
      );
    } else {
      const showError = this.showError;
      auth
        .signInWithEmailAndPassword(emailInput, passwordInput)
        .catch(function(err) {
          showError(err);
        });
    }
  }

  showError(err) {
    this.setState(
      {
        errorClass: "visible",
        errorMessage: err.message
      },
      () => {
        setTimeout(this.hideError, this.messageDuration);
      }
    );
  }

  hideError() {
    this.setState({ errorClass: "invisible" }, () => {
      this.removeError();
    });
  }

  removeError() {
    this.setState({ errorClass: "hidden" });
  }

  render() {
    const errorClass = this.state.errorClass,
      errorMessage = this.state.errorMessage;

    return (
      <div className="login">
        <p className={"error " + errorClass}>{errorMessage}</p>
        <p>Only administrators can access this information. </p>
        <form className="LoginForm" onSubmit={this.handleSubmit}>
          <Input inputType="email" />
          <Input inputType="password" />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
