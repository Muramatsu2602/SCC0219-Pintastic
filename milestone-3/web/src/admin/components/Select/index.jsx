import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function RawSelect(props) {
  const {className, id, icon, label, options, ...selectProps} = props;

  return (
    <div className={className}>
      <label htmlFor={id}>
        { icon ? <FontAwesomeIcon icon={icon} /> : <></> }
        { label }
      </label>
      <select {...selectProps}>
        {
          options.map((option) => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))
        }
      </select>
    </div>
  );
}

export default styled(RawSelect)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--black2);

    label {
        font-size: var(--font-sm);

        display: flex;
        flex-direction: row;
        gap: 5px;
    }

    select {
        height: 40px;
        background-color: var(--lightest-gray);

        border: 2px solid transparent;
        border-radius: 5px;
        transition: border-color .05s ease;

        box-sizing: border-box;
        padding: 5px;
        font-size: var(--font-sm);
    }

    select:focus-visible {
        outline: none;
        border-color: var(--lighter-gray);
    }
`;
