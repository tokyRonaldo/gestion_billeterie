<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Apropos;
use App\Entity\Evenement;
use App\Entity\Type;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $roles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR'];
        $faker = Factory::create();

            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword('test');
            $user->setRoles($roles);

            $manager->persist($user);

            $apropos = new Apropos();
            $apropos->setName($faker->name);
            $apropos->setEmail($faker->email);
            $apropos->setDescription($faker->words(3,true));
            $apropos->setPhoneNumber($faker->words(3,true));

            $manager->persist($apropos);

            for ($k=0;$k<3;$k++){
                $type = new Type();
                $type->setNameType($faker->name);
                $type->setDescription($faker->words(3,true));
    
                $manager->persist($type);

                for ($i=0;$i<5;$i++){
                    $event = new Evenement();
                    $event->setName($faker->name);
                    $event->setOrganisateur($faker->name);
                    $event->setPrixEntrer($faker->numberBetween(100, 5000));
                    $event->setDate($faker->dateTime());
                    $event->setDescription($faker->words(3,true));
                    $event->setType($type);
        
                    $manager->persist($event);
        

                }
                  
            }

        $manager->flush();
    }
}
