import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BoardItem from "./BoardItem";

class Boards extends Component {
  render() {

    return this.props.boards.map((board) => (
        <BoardItem key={board.id} todos={board.items} addTodo={this.props.addTodo} markComplete={this.props.markComplete} delBoard={this.props.delBoard}/>
    ));
  }
}

// PropTypes
Boards.propTypes = {
  addTodo: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  boards: PropTypes.object.isRequired,
  delBoard: PropTypes.func.isRequired,
  markComplete: PropTypes.func.isRequired
}

export default Boards;