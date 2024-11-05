<?php

namespace App\Controller;

use App\Entity\Evenement;
use App\Entity\Apropos;
use App\Repository\EvenementRepository;
use App\Repository\AproposRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class EvenementController extends AbstractController
{
    #[Route('/api/last/events', name: 'lastEvents')]
    public function getLastEvents(EvenementRepository $eventRepository ,SerializerInterface $serializer): JsonResponse
    {
        $data= $eventRepository->lastEvents();
        $json = $serializer->serialize($data, 'json');

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/api/type/events/{type}', name: 'eventsType')]
    public function getEventsType($type,EvenementRepository $eventRepository ,SerializerInterface $serializer): JsonResponse
    {
        $data= $eventRepository->getEventsType($type);
        $json = $serializer->serialize($data, 'json');

        return new JsonResponse($json, 200, [], true);
    }

}
