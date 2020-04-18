import PropTypes from 'prop-types';
import React, { Component } from 'react';

import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => (
        <TodoItem keyObject={this.props.keyObject} key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
    ));
  }
}

// PropTypes
Todos.propTypes = {
  todos: PropTypes.object.isRequired,
  delTodo: PropTypes.func.isRequired,
  keyObject: PropTypes.string.isRequired,
  markComplete: PropTypes.func.isRequired
}

export default Todos;