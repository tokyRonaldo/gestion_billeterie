<?php

namespace App\Controller;

use App\Entity\Evenement;
use App\Entity\Apropos;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventImageController extends AbstractController
{
    #[Route('/api/event/{id}/upload', name: 'upload_image_event', methods: ['POST'])]
    public function upload(Request $request, Evenement $event, EntityManagerInterface $entityManager, SluggerInterface $slugger): JsonResponse
    {
        $file = $request->files->get('imageFile');

        if (!$file) {
            return new JsonResponse(['error' => 'No file uploaded'], Response::HTTP_BAD_REQUEST);
        }

        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        try {
            $file->move(
                $this->getParameter('images_directory'),
                $newFilename
            );
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Failed to upload file'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $event->setImg($newFilename);
        $entityManager->persist($event);
        $entityManager->flush();

        return new JsonResponse(['id' => $event->getId(), 'imageFilename' => $newFilename], Response::HTTP_OK);
    }

    #[Route('/api/apropos/image/{id}/upload', name: 'upload_file_apropos', methods: ['POST'])]
    public function uploadAproposFile(Request $request, Apropos $apropos, EntityManagerInterface $entityManager, SluggerInterface $slugger): JsonResponse
    {
        $imageFile = $request->files->get('imageFile');
        $logoFile = $request->files->get('logoFile');

        $fileName=array();

        if (!$imageFile && !$logoFile) {
            return new JsonResponse(['error' => 'No file uploaded'], Response::HTTP_BAD_REQUEST);
        }

        if($imageFile){

            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $imageFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();
    
            $fileName['imageFilename']= $imageFilename;
            try {
                $imageFile->move(
                    $this->getParameter('images_directory'),
                    $imageFilename
                );
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Failed to upload file'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
    
            $apropos->setImage($imageFilename);
            $entityManager->persist($apropos);
            $entityManager->flush();
        }

        if($logoFile){

            $originalFilename = pathinfo($logoFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $logoFilename = $safeFilename . '-' . uniqid() . '.' . $logoFile->guessExtension();
            $fileName['logoFilename']= $logoFilename;
    
            try {
                $logoFile->move(
                    $this->getParameter('images_directory'),
                    $logoFilename
                );
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Failed to upload file'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
    
            $apropos->setLogo($logoFilename);
            $entityManager->persist($apropos);
            $entityManager->flush();
        }
        return new JsonResponse(['id' => $apropos->getId(), 'imageFilename' => $fileName], Response::HTTP_OK);
    }

}