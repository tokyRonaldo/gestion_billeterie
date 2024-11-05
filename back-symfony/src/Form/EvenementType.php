<?php

namespace App\Form;

use App\Entity\Commande;
use App\Entity\Evenement;
use App\Entity\Type;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EvenementType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('img')
            ->add('date', null, [
                'widget' => 'single_text',
            ])
            ->add('description')
            ->add('organisateur')
            ->add('prixEntrer')
            ->add('commandes', EntityType::class, [
                'class' => Commande::class,
                'choice_label' => 'id',
                'multiple' => true,
            ])
            ->add('type', EntityType::class, [
                'class' => Type::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Evenement::class,
        ]);
    }
}
