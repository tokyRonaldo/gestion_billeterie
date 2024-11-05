<?php

namespace App\Controller;

use App\Repository\EvenementRepository;
use App\Entity\Evenement;
use App\Form\EvenementType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

class TestSymfonyControllerForm extends AbstractController
{
    #[Route('/test/symfony', name: 'app_test_symfony')]
    public function index(EvenementRepository $eventRep): Response
    {
        return $this->render('test_symfony/index.html.twig', [
            'events' => $eventRep->findAll(),
        ]);
    }

    #[Route('/test/symfony/create',name: 'app_test_symfony_create')]
    public function create(Request $request,EntityManagerInterface $em): Response
    {
        $event=new Evenement();
        $form= $this->createForm(EvenementType::class,$event);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $em->persist($event);
            $em->flush();

            return $this->redirectToRoute('app_test_symfony');
        }
        return $this->render('test_symfony/create.html.twig',[
            'event'=> $event,
            'form'=> $form
        ]);
    }

    #[Route('/test/symfony/{id}',name:'app_test_symfony_show',methods:['GET'])]
    public function show(Evenement $event) :Response
    {
        return $this->render('test_symfony/show.html.twig',[
            'event' => $event
        ]);
    }

    #[Route('/test/symfony/{id}/edit',name:'app_test_symfony_edit',methods:['GET','POST'])]
    public function edit(Evenement $event,Request $request,EntityManagerInterface $em) :Response
    {
        $form=$this->createForm(EvenementType::class,$event);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $em->flush();

            return $this->redirectToRoute('app_test_symfony');
        }

        return $this->render('test_symfony/edit',[
            'event' => $event,
            'form' => $form
        ]);
    }

    #[Route('/test/symfony/{id}/delete',name:'app_test_symfony_delete',methods:['POST','GET'])]
    public function delete(Evenement $event,EntityManagerInterface $em) :Response
    {
        $em->remove($event);
        $em->flush();

        return $this->redirectToRoute('app_test_symfony');
    }
}
