import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function UserAdminIndex() {
  const [listUsers, setListUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15); // Définit 15 lignes par défaut
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page, perPage) => {

    const apiUserGet = `http://localhost:8000/api/users?itemsPerPage=${perPage}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(apiUserGet);
      console.log(response)
      setListUsers(response.data['hydra:member']);
      setTotalRows(response.data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const removeUser= async (id) => {
    const apiUserRemove = `http://localhost:8000/api/users/${id}`;

    setLoading(true);
    try {
      const response = await fetch(apiUserRemove, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/ld+json'
        },
    });

    if (response.ok) {
      console.log('success')
    }
    } catch (error) {
      console.error("Erreur lors de la suppression d'un utilisateurs", error);
    } finally {
      // Fin du chargement
      setLoading(false);
      fetchUsers(page, perPage);
    }
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Roles',
      cell: row => 
        <div className='d-flex flex-column'>
          {row.roles.map((listRole)=> (
            <span className=''>{listRole}</span>
          ))}
        </div>
      ,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => 
/*          <Dropdown.Item >
            <Link to="/admin/event/create">Show<i className='fa fa-show ps-1'></i></Link>
          </Dropdown.Item>
*/
        <DropdownButton id="dropdown-basic-button" title="Action" size="sm">
          <Dropdown.Item href={`/admin/user/${row.id}`} >
            Edit<i className='fa fa-pencil ps-1'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => removeUser(row.id)}>
            Delete<i className='fa fa-trash ps-1'></i>
          </Dropdown.Item>
        </DropdownButton>
        ,
      sortable: true,
    },
 
  ];

  return (

    <div className='userContaint'>
    <div className='row'>
    <div className='d-flex justify-content-end'>
    <Link to="/admin/user/create" className="btn btn-primary">Add <i className='fa fa-plus ps-1'></i></Link>

    </div>
    </div>
    <div className='datatable'>
      <DataTable
        title="Liste des utilisateurs"
        columns={columns}
        data={listUsers}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[15,30]} // Options de pagination
        defaultSortField="name"
        highlightOnHover
        striped
        paginationPerPage={15} // Définit 15 lignes par page par défaut
        responsive
      />
    </div>
    </div>
  );
}

export default UserAdminIndex;
