import React from 'react';
import styled from 'styled-components';

function RawSubmitButton(props) {
  return (
    <button type='submit' className={props.className}>
      { props.value }
    </button>
  );
}

export default styled(RawSubmitButton)`
    width: 200px;
    height: 40px;

    background-color: var(--yellow);
    border: none;
    border-radius: 5px;
    color: var(--white);
    cursor: pointer;
    font-weight: bold;

    transition: filter .05s ease;

    :hover {
        filter: brightness(95%);
        background-color: var(--yellow);
    }
`;
