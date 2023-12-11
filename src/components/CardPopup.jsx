import React, { Component } from "react";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  handleSubmit(event) {
    alert("Submitted!");
    event.preventDefault();
  }

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <h3>Let's send some recognition!</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="cardForm">
              <div className="formRow">
                <div className="formColumn">
                <label for="recipient">Card recipient:</label>
                {/* TODO: render a list of names from full users */}
                <input type="text" id="recipient" name="recipient" /></div>
                {/* TODO: style this better, and potentially have values come from DB? */}
                <div className="formColumn"><label for="value">Select a team value:</label>
                <select name="value">
                  <option value="SayDo">Say/Do</option>
                  <option value="Commitment">Commitment</option>
                  <option value="Collaborate">Collaborate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Learning">Learning</option>
                  <option value="Spirited">Spirited</option>
                </select></div>
              </div>
              <label for="message">Card message:</label>
              <input type="text" id="message" name="message" />
              <div className="formRow">
              <label for="award">Is this an award nomination?</label>
              <input type="checkbox" name="award" /></div>
            </div>
            {/* TODO: submit button refreshes page */}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
