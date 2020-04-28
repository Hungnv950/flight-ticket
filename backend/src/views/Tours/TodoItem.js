import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: this.props.todo.cost,
      title: this.props.todo.title,
      editCost: false,
      editTitle: false
    };

    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);

    this.handleEditCost = this.handleEditCost.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);

    this.handleChangeField = this.handleChangeField.bind(this);
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  };

  handleEditCost() {
    this.setState({
      editCost:this.state.editCost !== true
    });
  };

  handleEditTitle() {
    this.setState({
      editTitle:this.state.editTitle !== true
    });
  };

  handleOnKeyUp(event) {
    if(event.key === 'Escape') {
      this.setState({edit:false, value:this.state.backup})
    }
  };

  render() {
    const { id} = this.props.todo;

    const { cost, title, canDel, editCost, editTitle } = this.state;

    return (
        <li draggable="true" data-id="0" className="custom-list-item">
          <div className="row">
            <div className="col-md-8">
              <input style={{display: editTitle ? 'block' : 'none'}} type="text" className="form-control" autoFocus={true} onBlur={this.handleEditTitle}
                     onChange={(ev) => this.handleChangeField('title', ev)} value={title}/>
              <span style={{display: !editTitle ? 'block' : 'none'}} onClick={this.handleEditTitle} className="sortable-list-item-content">
                {title}
              </span>
            </div>
            <div className="col-md-2 text-primary">
              <input style={{display: editCost ? 'block' : 'none'}} type="text" className="form-control" autoFocus={true} onBlur={this.handleEditCost}
                     onChange={(ev) => this.handleChangeField('cost', ev)} value={cost}/>
              <span style={{display: !editCost ? 'block' : 'none'}} onClick={this.handleEditCost} className="sortable-list-item-content">
                {cost} đ
              </span>
            </div>
            <div style={{display: canDel ? 'display' : 'none'}} className="col-md-1 align-self-center">
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