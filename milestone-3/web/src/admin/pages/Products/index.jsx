import React, {useState} from 'react';

import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';

import PintasticException from '../../../models/PinstaticException';
import Datatable from '../../components/Datatable';
import Input from '../../components/Input';
import Select from '../../components/Select';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import mockProducts from '../../../mock/products.json';

import './styles.css';

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [modal, setModal] = useState(null);

  const columns = [
    'Imagem',
    'Nome',
    'Estoque',
    'Preço',
    'Desconto',
    'Status',
  ];

  const data = formatProductsIntoDatatable(products, setModal);

  return (
    <>
      <div id='admin-products-page'>
        { modal }
        <div className='content-header'>
          <h1>Produtos</h1>
          <button onClick={() => {
            const createProductModal = (
              <CreateProductModal products={products} setProducts={setProducts} hideModal={() => setModal(null)} />
            );

            setModal(createProductModal);
          }}>
            <FontAwesomeIcon icon={faPlus} /> Criar novo
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
        'productCategory': category,
        'productTitle': title,
        'productDescription': description,
        'productImage': image,
        'productPrice': price,
        'productDiscountPercentage': discount,
        'productStock': stock,
        'productStatus': 'active',
      };

      props.setProducts([product, ...props.products]);

      console.log(product);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível realizar o login, tente novamente mais tarde', 'error');
    }
  }

  const [category, setCategory] = useState('pin');
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
          <Select
            label='Categoria'
            options={[
              {value: 'pin', text: 'Pin'},
              {value: 'sticker', text: 'Sticker'},
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='Título do produto'
            label='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='Descrição do produto'
            label='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='https://linkda.img'
            label='Link da imagem'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0.00'
            step='0.01'
            placeholder='19.99'
            label='Preço (R$)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0'
            max='100'
            step='1'
            placeholder='20'
            label='Desconto (%)'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0'
            step='1'
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

function EditProductModal(props) {
  async function handleEditProduct(e) {
    try {
      e.preventDefault();

      const updatedProduct = {
        'productCategory': category,
        'productTitle': title,
        'productDescription': description,
        'productImage': image,
        'productPrice': price,
        'productDiscountPercentage': discount,
        'productStock': stock,
        'productStatus': 'active',
      };

      Object.assign(props.product, updatedProduct);

      console.log(updatedProduct);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o produto, tente novamente mais tarde', 'error');
    }
  }

  const [category, setCategory] = useState(props?.product?.productCategory || 'pin');
  const [title, setTitle] = useState(props?.product?.productTitle || '');
  const [description, setDescription] = useState(props?.product?.productDescription || '');
  const [image, setImage] = useState(props?.product?.productImage || '');
  const [price, setPrice] = useState(props?.product?.productPrice || '');
  const [discount, setDiscount] = useState(props?.product?.productDiscountPercentage || '');
  const [stock, setStock] = useState(props?.product?.productStock || '');

  return (
    <Modal
      { ...props }
      title='Editar produto'
      body={(
        <form onSubmit={handleEditProduct}>
          <Select
            label='Categoria'
            options={[
              {value: 'pin', text: 'Pin'},
              {value: 'sticker', text: 'Sticker'},
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='Título do produto'
            label='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='Descrição do produto'
            label='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='https://linkda.img'
            label='Link da imagem'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0.00'
            step='0.01'
            placeholder='19.99'
            label='Preço (R$)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0'
            max='100'
            step='1'
            placeholder='20'
            label='Desconto (%)'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <Input
            type='number'
            min='0'
            step='1'
            id='productStock'
            placeholder='100'
            label='Estoque (unidades)'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <SubmitButton
            value='Salvar'
          />
        </form>
      )}
    />
  );
}

function ToggleProductStatusModal(props) {
  async function handleToggleProductStatus(e) {
    try {
      e.preventDefault();

      const updatedProduct = props.product;
      updatedProduct.productStatus = updatedProduct.productStatus == 'active' ? 'inactive' : 'active';

      console.log(updatedProduct);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o produto, tente novamente mais tarde', 'error');
    }
  }

  return (
    <Modal
      { ...props }
      title={props.product.status == 'active' ? 'Deseja desativar o produto?' : 'Deseja ativar o produto?'}
      body={(
        <form onSubmit={handleToggleProductStatus}>

          <SubmitButton
            value='Confirmar'
          />
        </form>
      )}
    />
  );
}

function DeleteProductModal(props) {
  async function handleDeleteProduct(e) {
    try {
      e.preventDefault();

      const updatedProduct = props.product;
      updatedProduct.productDeleted = true;

      console.log(updatedProduct);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o produto, tente novamente mais tarde', 'error');
    }
  }

  return (
    <Modal
      { ...props }
      title={'Deseja realmente excluir o produto?'}
      body={(
        <form onSubmit={handleDeleteProduct}>

          <SubmitButton
            value='Confirmar'
          />
        </form>
      )}
    />
  );
}

function formatProductsIntoDatatable(products, setModal) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return products
      .filter((product) => !product.productDeleted)
      .map((product) => {
        return [
          {
            'type': 'image',
            'value': {
              'image': product.productImage,
              'alt': product.productTitle,
            },
          },
          {
            'type': 'text',
            'value': product.productTitle,
          },
          {
            'type': 'text',
            'value': product.productStock,
          },
          {
            'type': 'text',
            'value': formatter.format(product.productPrice),
          },
          {
            'type': 'text',
            'value': product.productDiscountPercentage + '%',
          },
          {
            'type': 'status',
            'value': product.productStatus,
          },
          {
            'type': 'options',
            'value': [
              {
                'title': 'Editar',
                'icon': faPencil,
                'action': () => {
                  const editProductModal = (
                    <EditProductModal
                      hideModal={() => setModal(null)}
                      product={product}
                    />
                  );

                  setModal(editProductModal);
                },
              },
              {
                'title': product.productStatus == 'active' ? 'Desativar' : 'Ativar',
                'icon': faPencil,
                'action': () => {
                  const toggleProductStatusModal = (
                    <ToggleProductStatusModal
                      hideModal={() => setModal(null)}
                      product={product}
                    />
                  );

                  setModal(toggleProductStatusModal);
                },
              },
              {
                'title': 'Excluir',
                'icon': faTrash,
                'action': () => {
                  const deleteProductModal = (
                    <DeleteProductModal
                      hideModal={() => setModal(null)}
                      product={product}
                    />
                  );

                  setModal(deleteProductModal);
                },
              },
            ],
          },
        ];
      });
}
