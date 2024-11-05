<?php
// src/Controller/ContactController.php
namespace App\Controller;

use App\Entity\Apropos;
use App\Repository\AproposRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/api/send-email', name: 'send_email', methods: ['POST'])]
    public function sendEmail(Request $request,AproposRepository $aproposRepository, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $message = $data['message'] ?? '';

        $apropRep= $aproposRepository->findAll();
        $first= $apropRep[0]->getEmail();

        if (empty($name) || empty($email) || empty($message)) {
            return new JsonResponse(['error' => 'All fields are required.'], 400);
        }

        // Créer l'email
        $emailMessage = (new Email())
            ->from($email)
            ->to('tokyronaldo98@gmail.com') // L'adresse où l'email sera envoyé
            ->subject('Contact Form Submission')
            ->text("Name: $name\nEmail: $email\nMessage: $message");

        // Envoyer l'email
        try {
            $mailer->send($emailMessage);
            return new JsonResponse(['status' => 'Email sent successfully','data' =>$first]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Failed to send email'], 500);
        }
    }
}
