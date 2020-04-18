import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { id, title, cost } = this.props.todo;

    return (
        <li draggable="true" data-id="0" className="custom-list-item">
          <div className="row">
            <div className="col-md-8">
              <span className="sortable-list-item-content" tabIndex="0">
                {title}
              </span>
            </div>
            <div className="col-md-2 text-primary">
              <span className="sortable-list-item-price" tabIndex="0">
                {cost}
              </span>
            </div>
            <div className="col-md-1 align-self-center">
              <i onClick={this.props.delTodo.bind(this, this.props.keyObject, id)} className="fa fa-times-circle text-gray"></i>
            </div>
          </div>
        </li>
    )
  }
}

// PropTypes
TodoItem.propTypes = {
  todos: PropTypes.object.isRequired,
  delTodo: PropTypes.func.isRequired,
  keyObject: PropTypes.string.isRequired,
  markComplete: PropTypes.func.isRequired
}

export default TodoItem;