import React from 'react';
import styled from 'styled-components';

import caramelo from './caramelo.png';

export default styled(RawDatatable)`
  width: 100%;

  table {
      width: 100%;
      text-align: center;
      border-collapse: separate;
      border-spacing: 0 15px;
  }

  table td,th {
      vertical-align: middle;
  }

  table tr:not(:first-child) {
      background-color: var(--lightest-gray);
      border: none;
      height: 100px;
  }

  table img {
      height: 80px;
      max-width: 100px;
  }

  .datatable-options > i {
      position: relative;
  }

  .datatable-options > i {
      cursor: pointer;
      padding: 5px;
      border-radius: 100%;
      transition: background-color .2s;
  }

  /* .datatable-options > i:hover {
      background-color: var(--lighter-gray);
  } */

  .datatable-options > i:hover ul {
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
      width: 100%;
      display: flex;
      justify-content: center;
  }

  .pagination ul li {  
      background-color: var(--lightest-gray);
      margin-right: 10px;
      width: 30px;
      aspect-ratio: 1/1;
      border-radius: 100%;

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

function RawDatatable(props) {
  return (
    <div className={props.className}>
      <table>
        <tr>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Estoque</th>
          <th>Preço</th>
          <th>Desconto</th>
          <th>Status</th>
          <th>Opções</th>
        </tr>
        <tr>
          <td><img src={caramelo} alt="Imagem do pin" /></td>
          <td>Product title</td>
          <td>10</td>
          <td>R$ 49,99</td>
          <td>10%</td>
          <td><div className="status active"></div></td>
          <td className="datatable-options">
            <i className="fa fa-ellipsis-h">
              <ul>
                <li onClick="openProductEditModal('id')"><i className="fa fa-edit"></i> Editar</li>
                <li onClick="openProductStatusToggleModal('id')"><i className="fa fa-edit"></i> Desativar</li>
                <li onClick="openProductDeleteModal('id')"><i className="fa fa-trash"></i> Excluir</li>
              </ul>
            </i>
          </td>
        </tr>
        <tr>
          <td><img src={caramelo} alt="Imagem do pin" /></td>
          <td>Product title</td>
          <td>0</td>
          <td>R$ 49,99</td>
          <td>10%</td>
          <td><div className="status inactive"></div></td>
          <td className="datatable-options">
            <i className="fa fa-ellipsis-h">
              <ul>
                <li onClick="openProductEditModal('id')"><i className="fa fa-edit"></i> Editar</li>
                <li onClick="openProductStatusToggleModal('id')"><i className="fa fa-edit"></i> Desativar</li>
                <li onClick="openProductDeleteModal('id')"><i className="fa fa-trash"></i> Excluir</li>
              </ul>
            </i>
          </td>
        </tr>
      </table>
      <div className="pagination">
        <ul>
          <li className="active-page">1</li>
        </ul>
      </div>
    </div>
  );
}
