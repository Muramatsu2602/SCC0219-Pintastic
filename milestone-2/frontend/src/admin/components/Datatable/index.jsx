import React, {useState} from 'react';
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';

function RawDatatable(props) {
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className={props.className}>
      <table>
        <thead>
          <tr>
            {
              props.columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))
            }
            {
            props.options ? <th>Opções</th> : <></>
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.slice(itemsPerPage * currentPage, itemsPerPage * currentPage + itemsPerPage).map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {
                    row.map(buildColumnElement)
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="pagination">
        <ul>
          {
            Array(Math.ceil(props.data.length / itemsPerPage))
                .fill(0)
                .map((_, page) => (
                  <li
                    key={page}
                    className={currentPage == page ? 'active-page' : ''}
                    onClick={() => setCurrentPage(page)}
                  >
                    { page + 1}
                  </li>
                ))
          }

        </ul>
      </div>
    </div>
  );
}

function buildColumnElement(column, index) {
  const mappedTypes = {
    'text': (column, index) => (
      <td key={index}>{column.value}</td>
    ),
    'image': (column, index) => (
      <td key={index}><img src={column.value.image} alt={column.value.alt} /></td>
    ),
    'status': (column, index) => (
      <td key={index}><div className={`status ${column.value}`}></div></td>
    ),
    'options': (column, index) => (
      <td key={index} className="datatable-options">
        <i className="datatable-options-icon">
          <FontAwesomeIcon icon={faEllipsisVertical} />
          <ul>
            {
              column.value.map((option, optionIndex) => (
                <li key={optionIndex} onClick={option.action}>
                  <FontAwesomeIcon icon={option.icon} /> {option.title}
                </li>
              ))
            }
          </ul>
        </i>
      </td>
    ),
  };

  if (!(column.type in mappedTypes)) {
    console.error('Column type is not mapped: ' + column.type);

    return (
      <td key={index}></td>
    );
  }

  return mappedTypes[column.type](column, index);
}

export default styled(RawDatatable)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
      width: 100%;
      text-align: center;
      border-collapse: separate;
      border-spacing: 0 15px;
  }

  table td,th {
      vertical-align: middle;
  }

  table tbody tr {
      background-color: var(--lightest-gray);
      border: none;
      height: 100px;
  }

  table img {
      height: 80px;
      max-width: 100px;
  }

  .datatable-options > .datatable-options-icon {
      position: relative;
  }

  .datatable-options > .datatable-options-icon {
      cursor: pointer;
      padding: 5px;
      border-radius: 100%;
      transition: background-color .2s;
  }

  /* .datatable-options > .datatable-options-icon:hover {
      background-color: var(--lighter-gray);
  } */

  .datatable-options > .datatable-options-icon:hover ul {
      display: block;
  }

  .datatable-options ul {
      position: absolute;
      top: 0px;
      right: 0px;

      display: none;
  }

  .datatable-options ul {
      background-color: var(--white);
      padding: 10px;
      width: 120px;

      text-align: left;
      font-family: 'Poppins';
      font-size: var(--font-sm);
      z-index: 99;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 5px;

      cursor: default;
  }

  .datatable-options ul li {
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
  }

  .datatable-options ul li:hover {
      background-color: var(--lighter-gray);
  }

  .pagination {
      width: 80%;
      display: flex;
      justify-content: center;
  }

  .pagination ul li {  
      background-color: var(--lightest-gray);
      margin-right: 10px;
      width: 30px;
      aspect-ratio: 1/1;
      border-radius: 100%;
      margin-bottom: 10px;

      float: left;
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      transition: filter .2s;
  }

  .pagination ul li:not(.active-page):hover {
      filter: brightness(90%);
  }

  .pagination .active-page {
      background-color: var(--yellow);
      color: var(--white);
  }
`;
