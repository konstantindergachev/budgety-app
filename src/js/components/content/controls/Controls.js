import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../ui/button/Button';
import './Controls.scss';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.modeRef = React.createRef();
    this.descrRef = React.createRef();
    this.costRef = React.createRef();
  }
  createNote = (ev) => {
    ev.preventDefault();
    const noteMode = this.modeRef.current.value;
    const noteDescr = this.descrRef.current.value;
    const noteCost = parseFloat(this.costRef.current.value, 10);

    if (
      typeof noteMode === 'string' &&
      typeof noteDescr === 'string' &&
      noteDescr.length > 0 &&
      !isNaN(noteCost) &&
      noteCost > 0
    ) {
      this.props.addNoteForm(noteMode, noteDescr, noteCost);

      this.descrRef.current.focus();
      this.descrRef.current.value = null;
      this.costRef.current.value = null;
    }
  };

  render() {
    const form = (
      <form className="note" ref={this.formRef} onSubmit={this.createNote}>
        <select className="note__select" ref={this.modeRef}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input
          type="text"
          className="note__descr"
          ref={this.descrRef}
          placeholder="Добавить описание"
        />
        <input
          type="number"
          className="note__value"
          ref={this.costRef}
          placeholder="Цифра"
          step="any"
        />
        <Button
          type="submit"
          classname="add__btn"
          title="&#10004;"
          tooltip="tooltip"
        />
      </form>
    );
    return form;
  }
}

Controls.propTypes = {
  addNoteForm: PropTypes.func.isRequired,
};

export default Controls;
