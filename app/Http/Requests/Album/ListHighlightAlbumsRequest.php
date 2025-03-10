<?php

declare(strict_types=1);

namespace App\Http\Requests\Album;

use Common\App\Constants\PerPage;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Request class for listing highlighted albums.
 */
class ListHighlightAlbumsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'per_page' => [
                'required',
                'integer',
                'min:1',
                'max:' . PerPage::MAX,
            ],
        ];
    }

    /**
     * Handle the request data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'per_page' => isset($this->per_page) ? (int) $this->per_page : PerPage::DEFAULT,
        ]);
    }
}
