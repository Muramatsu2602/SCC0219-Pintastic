import React from 'react';
import styled from 'styled-components';

function RawModal(props) {
  return (
    <div className={props.className} onClick={props.hideModal}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{props.title}</h3>
        { props.body }
      </div>
    </div>
  );
}

export default styled(RawModal)`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, .3);

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;

    .modal-card {
        width: 500px;
        background-color: var(--white);
        padding: 20px;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;
