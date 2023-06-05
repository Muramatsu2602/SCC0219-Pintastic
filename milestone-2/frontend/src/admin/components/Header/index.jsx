import React from 'react';
import styled from 'styled-components';

import logo from './pintastic-logo-small.png';

export default styled(RawHeader)`
  width: 100%;
  height: 80px;
  background-color: var(--yellow);

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 70px;

  .logo {
      display: flex;
      align-items: center;
      gap: 10px;

      font-size: var(--font-lg);
  cursor: pointer;
  }

  .logo img {
      width: 36px;
      height: auto;
  }

  .logo p {
      color: var(--white);
  }

  .logo p span {
      color: var(--black);
  }
`;

function RawHeader(props) {
  return (
    <div className={props.className}>
      <a href="">
        <div className="logo">
          <img src={logo} alt="Pintastic logo" />
          <p>Pintastic<span>Admin</span></p>
        </div>
      </a>
    </div>
  );
}
