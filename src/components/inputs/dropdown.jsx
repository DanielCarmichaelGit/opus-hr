import { useState, useRef } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 260px;
  border-radius: 5px;
  border: none;
`;

const DropdownHeader = styled.div`
  background-color: #e5e5e5;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  width: 260px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const Dropdown = ({ options, selectedOption, handleOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleItemClick = (option) => {
    // Handle the selected option
    console.log(`Selected option: ${option}`);
  };

  return (
    <DropdownContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <DropdownHeader>
        {selectedOption ? selectedOption : "Seniority"}
      </DropdownHeader>
      <DropdownContent isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
