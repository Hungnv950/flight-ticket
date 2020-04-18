import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" placeholder="Thêm mới" onChange={(ev) => this.handleChangeField('title', ev)}
                   value={title}/>
            <small>Sau khi hoàn thành, ấn <b>Enter</b> để thêm chi phí</small>
          </div>
        </form>
    )
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  keyObject: PropTypes.string.isRequired
}

export default AddTodo;