<?php

namespace App\Http\Requests;

use App\Models\User\Chat;
use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $chatModel = get_class(new Chat());

        return [
            'message'=>'required|string',
            //'file_path' => 'sometimes|file|mimes:jpeg,png,pdf|max:2048', // Example validation for file uploads (adjust as needed)
            'image_path' => 'sometimes|image|mimes:jpeg,png|max:2048', // Example validation for image uploads (adjust as needed)
        ];
    }
}
