<?php

declare(strict_types=1);

namespace App\UseCases\Project;

use App\Repositories\ProjectRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * The use case class for getting highlighted projects.
 */
class GetHighlightedProjectsUseCase
{
    public function __construct(private readonly ProjectRepository $projectRepository)
    {
    }

    public function __invoke(): Collection
    {
        return $this->projectRepository->getHighlights();
    }
}
