<?php

namespace App\Entity;

use App\Repository\TypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Controller\TestController;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
//use App\Filter\LastItemsFilter;

#[ORM\Entity(repositoryClass: TypeRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Delete(),
        new Get(
            uriTemplate: '/testController/{id}',
            controller: TestController::class,
            paginationEnabled: false,
            filters: [],
            ),
//        new Get(name: 'testController', uriTemplate: '/test/allEvent', controller: TestController::class),
        new GetCollection(normalizationContext: ['groups' => 'type:item']),
        new Post(),
        ],
        order: ['nameType' => 'DESC', 'id' => 'ASC'],
        paginationEnabled: true,
        paginationItemsPerPage: 15,

)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'nameType' => 'exact', 'description' => 'partial'])]
//#[ApiFilter(LastItemsFilter::class)]
class Type
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['conference:list', 'type:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['conference:list', 'type:item','event:read'])]
    private ?string $nameType = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['conference:list', 'type:item'])]
    private ?string $description = null;

    /**
     * @var Collection<int, Evenement>
     */
    #[ORM\OneToMany(targetEntity: Evenement::class, mappedBy: 'type')]
    private Collection $EvmntID;

    public function __construct()
    {
        $this->EvmntID = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameType(): ?string
    {
        return $this->nameType;
    }

    public function setNameType(string $nameType): static
    {
        $this->nameType = $nameType;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Evenement>
     */
    public function getEvmntID(): Collection
    {
        return $this->EvmntID;
    }

    public function addEvmntID(Evenement $evmntID): static
    {
        if (!$this->EvmntID->contains($evmntID)) {
            $this->EvmntID->add($evmntID);
            $evmntID->setType($this);
        }

        return $this;
    }

    public function removeEvmntID(Evenement $evmntID): static
    {
        if ($this->EvmntID->removeElement($evmntID)) {
            // set the owning side to null (unless already changed)
            if ($evmntID->getType() === $this) {
                $evmntID->setType(null);
            }
        }

        return $this;
    }
}




/*

// src/components/PaginatedList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 10; // Nombre d'éléments par page

const PaginatedList = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchItems(currentPage + 1); // API page starts from 1
    }, [currentPage]);

    const fetchItems = async (page) => {
        try {
            const response = await axios.get(`https://api.example.com/products?page=${page}&itemsPerPage=${ITEMS_PER_PAGE}`);
            setItems(response.data.hydra:member); // Adjust according to your API response
            setPageCount(Math.ceil(response.data.hydra:totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div>
            <h1>Paginated List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li> // Adjust according to your data structure
                ))}
            </ul>
            <ReactPaginate
                previousLabel={'« Previous'}
                nextLabel={'Next »'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default PaginatedList;
*/





/*
// src/App.js
import React from 'react';
import PaginatedList from './components/PaginatedList';

const App = () => {
    return (
        <div className="App">
            <PaginatedList />
        </div>
    );
};

export default App;

*/

/*
 src/App.css 
.pagination {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
}

.page-item {
    margin: 0 5px;
}

.page-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: blue;
}

.active .page-link {
    background-color: #007bff;
    color: white;
}

*/