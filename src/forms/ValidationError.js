import React, { Component } from "react";

class ValidationError extends Component {
  render() {
    if (this.props.errors) {
      return this.props.errors.map((err) => (
        <h6 className="text-danger" key={err}>
          {err}
        </h6>
      ));
    }
    return null;
  }
}

export default ValidationError;
