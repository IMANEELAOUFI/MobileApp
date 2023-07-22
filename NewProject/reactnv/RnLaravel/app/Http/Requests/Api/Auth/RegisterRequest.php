<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
        return [
            'username'=>'required|string|min:4|unique:users,username',
            'email'=>'required|string|email|unique:users,email',
            'phone_number'=>'required|string|min:8|unique:users,phone_number',
            'password'=>'required|string|min:6|confirmed',
            //'role'=>'required|string',
            //'password_confirmation' ??
        ];
    }
}
