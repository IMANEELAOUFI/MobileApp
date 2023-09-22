<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
   
    public function authorize()
{
    $userId = $this->route('user'); // Assuming you are using "user" as the route parameter
    return $userId == auth()->user()->id;
}

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            // Add other validation rules for the fields you want to update
        ];
    }
}
