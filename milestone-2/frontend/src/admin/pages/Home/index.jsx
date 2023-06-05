import React from 'react';

import {faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';

import Datatable from '../../components/Datatable';

import './styles.css';

export default function Home() {
  const columns = [
    'Imagem',
    'Nome',
    'Estoque',
    'Preço',
    'Desconto',
    'Status',
  ];

  const products = [
    [
      {
        'type': 'image',
        'value': {
          'image': 'https://raw.githubusercontent.com/Muramatsu2602/SCC0219-Pintastic/main/milestone-1/img/items/caramelo.png',
          'alt': 'Pin de cachorro caramelo',
        },
      },
      {
        'type': 'text',
        'value': 'Caramelo',
      },
      {
        'type': 'text',
        'value': '10',
      },
      {
        'type': 'text',
        'value': 'R$ 49.99',
      },
      {
        'type': 'text',
        'value': '10%',
      },
      {
        'type': 'status',
        'value': 'active',
      },
      {
        'type': 'options',
        'value': [
          {
            'title': 'Editar',
            'icon': faPencil,
            'action': () => {},
          },
          {
            'title': 'Desativar',
            'icon': faPencil,
            'action': () => {},
          },
          {
            'title': 'Excluir',
            'icon': faTrash,
            'action': () => {},
          },
        ],
      },
    ],
  ];

  return (
    <div id="admin-home-page">
      <div className="content-header">
        <h1>Produtos</h1>
        <button onClick="openNewProductModal()"><i className="fa fa-plus"></i> Criar novo</button>
      </div>
      <hr />
      <Datatable columns={columns} data={products} options={true} />
    </div>
  );
}
