<?php

namespace App\Repository;

use App\Entity\Evenement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Evenement>
 */
class EvenementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Evenement::class);
    }

//    /**
//     * @return Evenement[] Returns an array of Evenement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Evenement
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    
        public function lastEvents()
        {
            return $this->createQueryBuilder('e')
                ->orderBy('e.id', 'DESC')
                ->setMaxResults(5)
                ->getQuery()
                ->getResult()
            ;
        }


        public function findAllData(){
            $val='test';
            return $this->createQueryBuilder('e')
            ->andWhere('e.name =:val')
            ->setParameter('val' ,$val)
            ->getQuery()
            ->getResult();
        }

        public function getEventsType($type){
            
            return $this->createQueryBuilder('e')
            ->join('e.type', 't') // Assure-toi que la relation entre Evenement et Type est bien configurée
                ->addSelect('t.nameType','e.id','e.name','e.img','e.description','e.date','e.organisateur')

            ->andWhere('e.type =:type')
            ->setParameter('type' ,$type)
            ->getQuery()
            ->getResult();
        }

        // src/Repository/EvenementRepository.php
        public function findEventsGroupedByType()
        {
            $qb = $this->createQueryBuilder('e')
                ->join('e.type', 't') // Assure-toi que la relation entre Evenement et Type est bien configurée
                //->addSelect('t','e')
                ->orderBy('t.nameType', 'ASC') // Ordonner par type si nécessaire
                ->getQuery();

            $events = $qb->getResult();

            // Regrouper par type
            $groupedEvents = [];
            foreach ($events as $event) {
                $typeName = $event->getType()->getNameType(); // Suppose que `getName()` retourne le nom du type
                //$typeId = $event->getType()->getId(); // Suppose que `getName()` retourne le nom du type
                $groupedEvents[$typeName][] = $event;
            }

            return $groupedEvents;
        }

        
}
