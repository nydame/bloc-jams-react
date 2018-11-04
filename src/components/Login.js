import React, { Component } from "react";
import auth from "../data/firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorClass: "hidden",
      errorMessage: ""
    };
  }
  render() {
    const errorClass = this.state.errorClass,
      errorMessage = this.state.errorMessage;
    return (
      <div className="login">
        <p className={errorClass}>{errorMessage}</p>
        <p>
          Only administrators can access this information.{" "}
          <button
            onClick={auth
              .signInWithEmailAndPassword(email, password)
              .catch(function(err) {
                // CREATE A FORM TO CAPTURE EMAIL AND PASSWORD
                // HANDLE INPUT ENTRY
                // HANDLE FORM SUBMISSION
                // HANDLE ERRORS HERE; see https://firebase.google.com/docs/auth/web/password-auth
                // LISTEN FOR AUTH EVENTS
              })}
          >
            Sign me in
          </button>
        </p>
      </div>
    );
  }
}

export default Login;
