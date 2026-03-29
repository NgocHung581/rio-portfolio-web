<?php

declare(strict_types=1);

namespace App\UseCases\MediaItem;

use App\Repositories\MediaItemRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * The use case class for getting media items that display on the banner.
 */
class GetMediaItemsOnBannerUseCase
{
    public function __construct(private readonly MediaItemRepository $mediaItemRepository)
    {
    }

    public function __invoke(): Collection
    {
        return $this->mediaItemRepository->getBanners();
    }
}
