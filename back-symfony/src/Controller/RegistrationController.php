<?php

// src/Controller/RegistrationController.php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
#[Route('/register', name: 'api_register', methods: ['POST'])]
public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em, JWTTokenManagerInterface $JWTManager): JsonResponse
{
    try{
    $data = json_decode($request->getContent(), true);

    $user = new User();
    $user->setEmail($data['email']);
    $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

    $em->persist($user);
    $em->flush();

    $token = $JWTManager->create($user);
    }catch(\Exception $e){
        return new JsonResponse(['error' => $e->getMessage()]);
    }

return new JsonResponse(['token' => $token]);
}
}