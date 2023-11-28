import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = ['Educators', 'Educator Portal', 'Educator Summit'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-toggle ${dropdownOpen ? 'open' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedOption || 'Select an option'}
        <i className="material-icons">arrow_drop_down</i>
      </div>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
