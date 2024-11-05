<?php

namespace App\Controller;

use App\Repository\TypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;


class LastTypesController extends AbstractController
{
    #[Route('/last/types', name: 'lastTypes')]
    public function getLastTypes(TypeRepository $typeRepository ,SerializerInterface $serializer): JsonResponse
    {
        $items = $typeRepository->findLastThreeItems();
        $json = $serializer->serialize($items, 'json');

        return new JsonResponse($json, 200, [], true);

        //return new JsonResponse([ 'listEvents' => $data]);
    }
}
