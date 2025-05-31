<?php

namespace App\Enums;

enum CommandeStatus: string
{
    case EN_ATTENTE = 'en_attente';
    case EN_COURS = 'en_cours';
    case TERMINÉE = 'terminée';
    case ANNULÉE = 'annulée';
    

    public function getLabel(): string
    {
        return match ($this) {
            self::EN_ATTENTE => 'En attente',
            self::EN_COURS => 'En cours',
            self::TERMINÉE => 'Terminée',
            self::ANNULÉE => 'Annulée',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::EN_ATTENTE => 'bg-yellow-100 text-yellow-800',
            self::EN_COURS => 'bg-blue-100 text-blue-800',
            self::TERMINÉE => 'bg-green-100 text-green-800',
            self::ANNULÉE => 'bg-red-100 text-red-800',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn ($case): array => [
                $case->value => $case->getLabel(),
            ])
            ->toArray();
    }
}
