<?php

namespace App\Controller;

use App\Repository\AproposRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class OneAproposController
{
    private AproposRepository $aproposRepository;

    public function __construct(AproposRepository $aproposRepository,SerializerInterface $serializer)
    {
        $this->aproposRepository = $aproposRepository;
        $this->serializer = $serializer;
    }

    public function __invoke()
    {
        $items = $this->aproposRepository->findOneItems();
        $json = $this->serializer->serialize($items, 'json');
       return new JsonResponse($json, 200, [], true);
    }
}
