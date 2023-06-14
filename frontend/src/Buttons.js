
import React from 'react';
import ButtonToolbar from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Buttons extends React.Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  };
  handleSelectPattern = (evt) => {
    this.props.patternNumber(evt);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolbar  variant="light" className="d-flex justify-content-end">
          <button className="btn btn-light" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-light" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-light" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-light" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-light" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-light" onClick={this.props.seed}>
            Seed
          </button>

          <DropdownButton 
            title="Grid Size"
            variant="light"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
            <Dropdown.Item eventKey="4">120x80</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="light"
            title="Patterns"
            id="pattern-menu"
            onSelect={this.handleSelectPattern}
          >
            <Dropdown.Item eventKey="1">Add Toad</Dropdown.Item>
            <Dropdown.Item eventKey="2">Add Glider</Dropdown.Item>
            <Dropdown.Item eventKey="3">Add LWSS</Dropdown.Item>
          </DropdownButton>
          

        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
