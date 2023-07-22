<?php

namespace App\Http\Controllers\Api\Auth;
use App\Mail\EmailVerification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User\User;
use App\Services\UserService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;


class RegisterController extends Controller
{
    /**
     * Register a new user.
     *
     * @param RegisterRequest $request
     * @param UserService $service
     * @return Response
     */
    public function register(RegisterRequest $request, UserService $service): Response
    {
        $role = $request->role;
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
         // Generate a unique verification token
        $verificationToken = Str::random(40);
        $data['email_verification_token'] = $verificationToken;
        // Set the verification token for the user
        $user = User::create($data);
        $user_role = Role::where(['name'=>$role])->first();
        if($user_role){
            $user->assignRole($user_role);
        }else $user->assignRole(Role::where(['name'=>'user'])->first());
        $me = User::find($user->id);
        Mail::to($me->email)->send(new EmailVerification($me));
        
       return response()->json([
            'success' => true,
            'message' => 'Verification link has been sent to your email.',
            'user' => $user,
        ], 200);
    }


     /**
     * verify email
     * @param VerifyEmailRequest $request
     * @param UserService $service
     * @return Response
     */

}
