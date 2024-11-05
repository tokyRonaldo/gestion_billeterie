<?php

namespace App\Controller;

use App\Repository\EvenementRepository;
use App\Entity\Evenement;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

class TestSymfonyController extends AbstractController
{
    #[Route('/test/symfony', name: 'app_test_symfony')]
    public function index(EvenementRepository $eventRep): Response
    {
        return $this->render('test_symfony/index.html.twig', [
            'all_data' => $eventRep->findAllData()
        ]);
    }

    #[Route('/create',name:'test_create')]
    public function create() :Response
    {
        return $this->render('create');
    }

    #[Route('/store',name:'test_store')]
    public function store(Request $request,EntityManagerInterface $em) :Response
    {
        $data=$request->get();
        $event=new Evenement();
        $event->setName($data['name']);
        $event->setDescription($data['description']);
        $event->setType($data['typeId']);
        $event->setImg($data['img']);

        $em->persist($event);
        $em->flush();

        return $this->redirectToRoute('test_index');

    }
    #[Route('/edit/{id}',name:'test_edit')]
    public function edit(Evenement $event) :Response
    {
        return $this->render('edit',[
            '$event' => $event
        ]);
    }

    #[Route('/update/{id}',name:'test_update',methods:['get','post'])]
    public function update(Request $request,Evenement $event,EntityManagerInterface $em) :Response
    {
        $data=$request->get();

        try{
        $event->setName($data['name']);
        $event->setDescription($data['description']);
        $event->setType($data['typeId']);
        $event->setImg($data['img']);

        $em->persist($event);
        $em->flush();

        return $this->redirectToRoute('test_index');

        }
        catch(\Exception $e){
            return $this->redirectToRoute('test_index',[
                'error' => $e->getMessage()
            ]);
        }
    }

    #[Route('/{id}/show',name:'test_show')]
    public function show($id,EvenementRepository $eventRep) :Response
    {
        $data=$event->findById($id);
         return $this->render('show.html.twig',[
            'data' => $data
         ]);
    }

    #[Route('/delete/{id}',name:'test_delete')]
    public function delete(Evenement $event,EntityManagerInterface $em) :Response
    {
        $em->remove($event);
        $em->flush();
        return $this->redirectToRoute('test_index');
    }
}
