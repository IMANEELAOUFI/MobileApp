<!DOCTYPE html>
<html>
    <h1>Email Verification</h1>
    <p>Hello {{ $user->name }},</p>
    <p>Please click on the following link to verify your email:</p>
    <a href="{{ $verificationUrl }}">Verify Email</a>
</html>
