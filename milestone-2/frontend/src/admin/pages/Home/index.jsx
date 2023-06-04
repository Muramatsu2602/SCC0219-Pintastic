import React from 'react';

import Datatable from '../../components/Datatable';

import './styles.css';

export default function Home() {
  return (
    <div id="admin-home-page">
      <div className="content-header">
        <h1>Produtos</h1>
        <button onClick="openNewProductModal()"><i className="fa fa-plus"></i> Criar novo</button>
      </div>
      <hr />
      <Datatable />
    </div>
  );
}
