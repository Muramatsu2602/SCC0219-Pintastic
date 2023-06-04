import React from 'react';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';

import Header from '../Header';
import Sidebar from '../Sidebar';

export default styled(RawAdminLayout)`
.content-wrapper {
  display: flex;
}

.content-wrapper main {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 30px 0;
}

.content-wrapper main .outlet {
  width: 1070px;
  height: 100%;
}
`;

function RawAdminLayout(props) {
  return (
    <div className={props.className}>
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main>
          <div className="outlet">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
