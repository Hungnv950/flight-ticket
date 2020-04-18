import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Todos from "./Todos";
import AddTodo from "./AddTodo";

class BoardItem extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.key);

    this.state = {
      title: 'new_board_1587201594886'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  };

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.props.keyObject,this.state.title);
    this.setState({ title: '' });
  }

  render() {

    const { title } = this.state;

    return (
        <div className="">
          <div className="rct-block">
            <div className="collapse show">
              <div className="rct-block-content">
                <div className="clearfix">
                  <div className="float-left">
                    <h5>{title}</h5>
                  </div>
                </div>
                <hr/>
                <div>
                  <ul className="sortable-list">
                    <Todos keyObject={this.props.key} todos={this.props.todos} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
                  </ul>
                  <AddTodo keyObject={this.props.key} addTodo={this.props.addTodo} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

// PropTypes
BoardItem.propTypes = {
  key: PropTypes.number.isRequired,
  todos: PropTypes.object.isRequired,
  addTodo: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  keyObject: PropTypes.string.isRequired
}

export default BoardItem;