import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil, faPlus} from '@fortawesome/free-solid-svg-icons';

import api from '../../../services/api';
import PintasticException from '../../../models/PintasticException';
import Datatable from '../../components/Datatable';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';

import './styles.css';

export default function Admins() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(null);

  const columns = [
    'Nome',
    'Última edição',
    'Email',
    'Status',
  ];

  const loadAdmins = async () => {
    const response = await api.get('/admins');

    setData(formatAdminsIntoDatatable(response.data, setModal));
  };

  useEffect(() => {
    loadAdmins();
  }, [modal]);

  return (
    <>
      <div id='admin-administrators-page'>
        { modal }
        <div className='content-header'>
          <h1>Administradores</h1>
          <button onClick={() => {
            const createAdminModal = (
              <CreateAdminModal hideModal={() => setModal(null)} />
            );

            setModal(createAdminModal);
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

function CreateAdminModal(props) {
  async function createAdmin(admin) {
    try {
      await api.post('/admins', admin);
    } catch (error) {
      if (error.response.status == 409) {
        throw new PintasticException('Duplicated email', 'Esse email já está sendo utilizado');
      }

      throw error;
    }
  }

  async function handleCreateAdmin(e) {
    try {
      e.preventDefault();

      const admin = {
        name,
        email,
      };

      await createAdmin(admin);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível criar o administrador, tente novamente mais tarde', 'error');
    }
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Modal
      { ...props }
      title='Novo administrador'
      body={(
        <form onSubmit={handleCreateAdmin}>
          <Input
            type='text'
            placeholder='Nome do administrador'
            label='Nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type='email'
            placeholder='admin@pintastic.com'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton
            value='Criar administrador'
          />
        </form>
      )}
    />
  );
}

function ToggleAdminStatusModal(props) {
  async function toggleAdminStatus(admin) {
    try {
      await api.put(`/admins/toggleActive/${admin._id}`);
    } catch (error) {
      if (error.response.status == 401) {
        throw new PintasticException('Permission denied', 'Você não possui permissão para editar esse recurso');
      }

      throw error;
    }
  }

  async function handleToggleAdminStatus(e) {
    try {
      e.preventDefault();

      const admin = props.admin;

      await toggleAdminStatus(admin);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o administrador, tente novamente mais tarde', 'error');
    }
  }

  return (
    <Modal
      { ...props }
      title={props.admin.active ? 'Deseja desativar o administrador?' : 'Deseja ativar o administrador?'}
      body={(
        <form onSubmit={handleToggleAdminStatus}>

          <SubmitButton
            value='Confirmar'
          />
        </form>
      )}
    />
  );
}

function formatAdminsIntoDatatable(admins, setModal) {
  const dateFormatter = new Intl.DateTimeFormat('pt-BR');

  return admins
      .map((admin) => {
        return [
          {
            'type': 'text',
            'value': admin.name,
          },
          {
            'type': 'text',
            'value': dateFormatter.format(new Date(admin.updatedAt)),
          },
          {
            'type': 'text',
            'value': admin.email,
          },
          {
            'type': 'status',
            'value': admin.active ? 'active' : 'inactive',
          },
          {
            'type': 'options',
            'value': [
              {
                'title': admin.active ? 'Desativar' : 'Ativar',
                'icon': faPencil,
                'action': () => {
                  const toggleAdminStatusModal = (
                    <ToggleAdminStatusModal
                      hideModal={() => setModal(null)}
                      admin={admin}
                    />
                  );

                  setModal(toggleAdminStatusModal);
                },
              },
            ],
          },
        ];
      });
}
