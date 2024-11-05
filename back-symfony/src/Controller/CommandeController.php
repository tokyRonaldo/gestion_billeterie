<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Commande;
use App\Repository\CommandeRepository;

class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function index(EntityManagerInterface $entityManager,Commande $commande): Response
    {

        $repository = $entityManager->getRepository(Commande::class);
$product = $commande->findAll();
var_dump($product);
        return $this->render('commande/index.html.twig', [
            'controller_name' => 'CommandeController',
        ]);
    }
}
