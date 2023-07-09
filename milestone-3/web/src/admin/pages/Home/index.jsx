import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';

import api from '../../../services/api';

import './styles.css';

export default function Products() {
  const [clients, setClients] = useState('0');
  const [purchases, setPurchases] = useState('0');
  const [receipt, setReceipt] = useState('R$ 0.0k');

  const loadData = async () => {
    try {
      const customers = (await api.get('/users')).data;
      const transactions = (await api.get('/transactions')).data;

      setClients(customers.length);
      setPurchases(transactions.length);

      const receipt = transactions.reduce((total, currentTransaction) => total + currentTransaction.totalPrice, 0);

      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      setReceipt(formatter.format(receipt));
    } catch (error) {
      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível carregar os dados, tente novamente mais tarde', 'error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
            <h4>{receipt}</h4>
            <p>Receita</p>
          </div>
        </div>
      </div>
    </>
  );
}
