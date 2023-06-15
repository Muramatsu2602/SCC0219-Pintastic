import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function RawInput(props) {
  return (
    <div className={props.className}>
      <label htmlFor={props.id}>
        { props.icon ? <FontAwesomeIcon icon={props.icon} /> : <></> }
        { props.label }
      </label>
      <input { ...props }/>
    </div>
  );
}

export default styled(RawInput)`
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

    input {
        height: 40px;
        background-color: var(--lightest-gray);

        border: 2px solid transparent;
        border-radius: 5px;
        transition: border-color .05s ease;

        box-sizing: border-box;
        padding: 5px;
        font-size: var(--font-sm);
    }

    input:focus-visible {
        outline: none;
        border-color: var(--lighter-gray);
    }
`;
