<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Controller\TestController;


#[ORM\Entity(repositoryClass: CommandeRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Delete(),
        new GetCollection(),
        new Post(),
        ],
        paginationEnabled: true,
        paginationItemsPerPage: 15,

        normalizationContext: ['groups' => ['commande:read']],
        denormalizationContext: ['groups' => ['commande:write']]

)]

class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['commande:read', 'commande:write'])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(['commande:read', 'commande:write'])]
    private ?int $nbre = null;

    #[ORM\Column]
    #[Groups(['commande:read', 'commande:write'])]
    private ?int $prixTotal = null;

    /**
     * @var Collection<int, Evenement>
     */
    #[ORM\ManyToMany(targetEntity: Evenement::class, inversedBy: 'commandes')]
    #[Groups(['commande:read', 'commande:write'])]
    private Collection $evenementID;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['commande:read', 'commande:write'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['commande:read', 'commande:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['commande:read', 'commande:write'])]
    private ?string $phoneNumber = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['commande:read', 'commande:write'])]
    private ?\DateTimeInterface $date = null;

    public function __construct()
    {
        $this->evenementID = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getNbre(): ?int
    {
        return $this->nbre;
    }

    public function setNbre(int $nbre): static
    {
        $this->nbre = $nbre;

        return $this;
    }

    public function getPrixTotal(): ?int
    {
        return $this->prixTotal;
    }

    public function setPrixTotal(int $prixTotal): static
    {
        $this->prixTotal = $prixTotal;

        return $this;
    }

    /**
     * @return Collection<int, Evenement>
     */
    public function getEvenementID(): Collection
    {
        return $this->evenementID;
    }

    public function addEvenementID(Evenement $evenementID): static
    {
        if (!$this->evenementID->contains($evenementID)) {
            $this->evenementID->add($evenementID);
        }

        return $this;
    }

    public function removeEvenementID(Evenement $evenementID): static
    {
        $this->evenementID->removeElement($evenementID);

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }
}
