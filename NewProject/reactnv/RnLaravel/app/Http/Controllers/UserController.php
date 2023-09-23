<?php

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Gets users except yourself
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::whereNotNull('email_verified_at')
        ->where('id', '!=', auth()->user()->id)
        ->get();
        return $this->successWithMsg($users);
    }


 /**
     * Gets my user
     *
     * @return JsonResponse
     */
    public function getSessionUser(): JsonResponse
    {
        $users = User::whereNotNull('email_verified_at')
        ->where('id', '=', auth()->user()->id)
        ->get();
        return $this->successWithMsg($users);
    }

    /**
     * Delete a user
     *
     * @param User $user
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->forceDelete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Update a user
     *
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
//     public function update(Request $request, $userId): JsonResponse
// {
//     $data = $request->validated();
//     $user = User::findOrFail($userId);
//     $user->update($data);
//     return $this->successWithMsg($user, 'User has been updated successfully.');
// }

/**
     * Update a user
     *
     * @param UpdateUserRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $userId): JsonResponse
    {
        $user = User::findOrFail($userId);
        
        // You can validate the data if needed, or directly use the request data
        $data = $request->all();
    
        $user->update($data);
        return $this->successWithMsg($user, 'User has been updated successfully.');
    }
    

}
