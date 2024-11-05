<?php

namespace App\Controller;

use App\Entity\Apropos;
use App\Form\AproposType;
use App\Repository\AproposRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/apropos')]
class AproposController extends AbstractController
{
    #[Route('/', name: 'app_apropos_index', methods: ['GET'])]
    public function index(AproposRepository $aproposRepository): Response
    {
        return $this->render('apropos/index.html.twig', [
            'apropos' => $aproposRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_apropos_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $apropo = new Apropos();
        $form = $this->createForm(AproposType::class, $apropo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($apropo);
            $entityManager->flush();

            return $this->redirectToRoute('app_apropos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('apropos/new.html.twig', [
            'apropo' => $apropo,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_apropos_show', methods: ['GET'])]
    public function show(Apropos $apropo): Response
    {
        return $this->render('apropos/show.html.twig', [
            'apropo' => $apropo,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_apropos_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Apropos $apropo, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(AproposType::class, $apropo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_apropos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('apropos/edit.html.twig', [
            'apropo' => $apropo,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_apropos_delete', methods: ['POST'])]
    public function delete(Request $request, Apropos $apropo, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$apropo->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($apropo);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_apropos_index', [], Response::HTTP_SEE_OTHER);
    }
}
