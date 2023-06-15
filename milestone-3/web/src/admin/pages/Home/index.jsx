import React, {useState} from 'react';

import './styles.css';

export default function Products() {
  const [clients] = useState('108');
  const [purchases] = useState('556');
  const [receipt] = useState('R$ 27.8k');

  return (
    <>
      <div id='admin-home-page'>
        <div className='content-header'>
          <h1>Início</h1>
          <p>{(new Date().getMonth() + 1) + '/' + new Date().getFullYear()}</p>
        </div>
        <hr />
        <div className='cards'>
          <div className="card">
            <h3>{clients}</h3>
            <p>Clientes cadastrados</p>
          </div>
          <div className="card">
            <h3>{purchases}</h3>
            <p>Compras realizadas</p>
          </div>
          <div className="card">
            <h3>{receipt}</h3>
            <p>Receita</p>
          </div>
        </div>
      </div>
    </>
  );
}
