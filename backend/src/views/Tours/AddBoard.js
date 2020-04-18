import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AddBoard extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.addBoard();
  }

  render() {
    return (
        <div id="create-board-area" onClick={this.handleSubmit}>
          <img className="mb-4" src={'assets/img/create-new-board.svg'} alt="new-board"/>
          <h3>Create New Board</h3>
        </div>
    )
  }
}

// PropTypes
AddBoard.propTypes = {
  addBoard: PropTypes.func.isRequired
}

export default AddBoard;