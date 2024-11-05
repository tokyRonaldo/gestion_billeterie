import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function EventAdminIndex() {
  const [listApropos, setListApropos] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15); // Définit 15 lignes par défaut
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchApropos = async (page, perPage) => {

    const apiAproposGet = `http://localhost:8000/api/aproposs?itemsPerPage=${perPage}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(apiAproposGet);
      console.log(response)
      setListApropos(response.data['hydra:member']);
      setTotalRows(response.data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApropos(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const removeApropos= async (id) => {
    const apiAproposRemove = `http://localhost:8000/api/aproposs/${id}`;

    setLoading(true);
    try {
      const response = await fetch(apiAproposRemove, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/ld+json'
        },
    });

    if (response.ok) {
      console.log('success')
    }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    } finally {
      // Fin du chargement
      setLoading(false);
      fetchApropos(page, perPage);
    }
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Logo',
      cell: row => 
        <img
      src={`http://localhost:8000/images/uploads/${row.logo}`}
      
      style={{ maxWidth: '70px', height: 'auto' }}
    />,
    },
    {
      name: 'Nom',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Num phone',
      selector: row => row.numberPhone,
      sortable: true,
    },
    {
      name: 'Decription',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Image',
      cell: row => 
        <img
      src={`http://localhost:8000/images/uploads/${row.image}`}
      
      style={{ maxWidth: '70px', height: 'auto' }}
    />,
    }, 
    {
      name: 'Action',
      cell: row => 
/*          <Dropdown.Item >
            <Link to="/admin/event/create">Show<i className='fa fa-show ps-1'></i></Link>
          </Dropdown.Item>
*/
        <DropdownButton id="dropdown-basic-button" title="Action" size="sm">
          <Dropdown.Item href={`/admin/apropos/${row.id}`} >
            Edit<i className='fa fa-pencil ps-1'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => removeApropos(row.id)}>
            Delete<i className='fa fa-trash ps-1'></i>
          </Dropdown.Item>
        </DropdownButton>
        ,
      sortable: true,
    },
 
  ];

  return (

    <div className='aproposContaint'>
    <div className='row'>
    <div className='d-flex justify-content-end'>
    <Link to="/admin/apropos/create" className="btn btn-primary">Add <i className='fa fa-plus ps-1'></i></Link>

    </div>
    </div>
    <div className='datatable'>
      <DataTable
        title="Liste des utilisateurs"
        columns={columns}
        data={listApropos}
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

export default EventAdminIndex;
