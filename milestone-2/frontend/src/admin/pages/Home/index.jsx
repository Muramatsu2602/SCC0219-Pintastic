import React, {useState} from 'react';

import {faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';

import Datatable from '../../components/Datatable';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import products from './products';
import './styles.css';

export default function Home() {
  const [modal, setModal] = useState(null);

  const columns = [
    'Imagem',
    'Nome',
    'Estoque',
    'Preço',
    'Desconto',
    'Status',
  ];

  const data = formatProductsIntoDatatable(products);

  return (
    <>
      <div id="admin-home-page">
        { modal }
        <div className="content-header">
          <h1>Produtos</h1>
          <button onClick={() => setModal(<CreateProductModal hideModal={() => setModal(null)} />)}>
            <i className="fa fa-plus"></i> Criar novo
          </button>
        </div>
        <hr />
        <Datatable columns={columns} data={data} options={true} />
      </div>
    </>
  );
}

function CreateProductModal(props) {
  async function handleCreateProduct(e) {
    try {
      e.preventDefault();

      const product = {
        title,
        description,
        image,
        price,
        discount,
        stock,
      };

      console.log(product);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      Swal.fire('Ocorreu um erro', 'Não foi possível realizar o login, tente novamente mais tarde', 'error');
    }
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');

  return (
    <Modal
      { ...props }
      title='Novo produto'
      body={(
        <form onSubmit={handleCreateProduct}>
          <Input
            type='text'
            id='productTitle'
            placeholder='Título do produto'
            label='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type='text'
            id='productDescription'
            placeholder='Descrição do produto'
            label='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type='text'
            id='productImage'
            placeholder='https://linkda.img'
            label='Link da imagem'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Input
            type="number"
            min="0.00"
            step="0.01"
            id='productPrice'
            placeholder='19.99'
            label='Preço (R$)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type="number"
            min="0"
            max="100"
            step="1"
            id='productDiscount'
            placeholder='20'
            label='Desconto (%)'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <Input
            type="number"
            min="0"
            step="1"
            id='productStock'
            placeholder='100'
            label='Estoque (unidades)'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <SubmitButton
            value='Criar produto'
          />
        </form>
      )}
    />
  );
}

function formatProductsIntoDatatable(products) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return products.map((product) => {
    return [
      {
        'type': 'image',
        'value': {
          'image': product.image,
          'alt': product.title,
        },
      },
      {
        'type': 'text',
        'value': product.title,
      },
      {
        'type': 'text',
        'value': product.stock,
      },
      {
        'type': 'text',
        'value': formatter.format(product.price),
      },
      {
        'type': 'text',
        'value': (product.discount * 100) + '%',
      },
      {
        'type': 'status',
        'value': product.status,
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
    ];
  });
}
