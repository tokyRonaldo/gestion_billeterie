import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function TypeAdminIndex() {
  const [listTypes, setListTypes] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15); // Définit 15 lignes par défaut
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTypes = async (page, perPage) => {

    const apiTypeGet = `http://localhost:8000/api/types?itemsPerPage=${perPage}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(apiTypeGet);
      console.log(response)
      setListTypes(response.data['hydra:member']);
      setTotalRows(response.data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des donnees", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const removeType= async (id) => {
    const apiTypeRemove = `http://localhost:8000/api/types/${id}`;

    setLoading(true);
    try {
      const response = await fetch(apiTypeRemove, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/ld+json'
        },
    });

    if (response.ok) {
      console.log('success')
    }
    } catch (error) {
      console.error("Erreur ", error);
    } finally {
      // Fin du chargement
      setLoading(false);
      fetchTypes(page, perPage);
    }
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nom',
      selector: row => row.nameType,
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
          <Dropdown.Item href={`/admin/type/${row.id}`} >
            Edit<i className='fa fa-pencil ps-1'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => removeType(row.id)}>
            Delete<i className='fa fa-trash ps-1'></i>
          </Dropdown.Item>
        </DropdownButton>
        ,
      sortable: true,
    },
 
  ];

  return (

    <div className='TypeContaint'>
    <div className='row'>
    <div className='d-flex justify-content-end'>
    <Link to="/admin/type/create" className="btn btn-primary">Add <i className='fa fa-plus ps-1'></i></Link>

    </div>
    </div>
    <div className='datatable'>
      <DataTable
        title="Liste des Types"
        columns={columns}
        data={listTypes}
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

export default TypeAdminIndex;
