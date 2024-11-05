<?php



namespace App\Controller;

use App\Repository\EvenementRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EventController
{
private EvenementRepository $eventRepository;

public function __construct(EvenementRepository $eventRepository)
{
$this->eventRepository = $eventRepository;
}
#[Route('/testController/{id}', name: 'testController')]

public function __invoke(int $id): JsonResponse
{
    var_dump('hello');
    $products = $this->eventRepository->find($id);
return new JsonResponse($products->getName());

}
}


