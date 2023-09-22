<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use BeyondCode\LaravelWebSockets\WebSockets\WebSocketServer;
use BeyondCode\LaravelWebSockets\Facades\WebSockets;
use App\Events\CallVideoStarted;
use App\Events\CallVideoJoined;
use App\Events\CallVideoAccepted;
use App\Events\CallVideoDeclined;
use App\Events\CallVideoEnded;
use Illuminate\Support\Facades\Event;
use App\Models\User;
use App\Models\Call;
use App\Events\IceCandidateReceived;
use App\Events\AnswerReceived;
use App\Events\OfferReceived;
use Illuminate\Support\Facades\Auth;

class VoiceCallController extends Controller
{
    public function startCall(Request $request)
{
    $validatedData = $request->validate([
        'recipient_id' => 'required|exists:users,id',
        'type' => 'in:video,audio', // Valide le type d'appel (vidéo ou audio)
        // Autres règles de validation si nécessaire
    ]);

    $initiatorId = auth()->id();
    $recipientId = $validatedData['recipient_id'];

    // Créer une nouvelle session d'appel
    $call = Call::create([
        'initiator_id' => $initiatorId,
        'recipient_id' => $recipientId,
        'status' => 'en_attente',
        'type' => $validatedData['type'],
        'start_at' => now(), // Enregistre le type d'appel
      
    ]);

    // Diffuser l'événement de démarrage d'appel via WebSockets
    //event(new CallVideoStarted($call->id));
    broadcast(new VoiceCallStarted($initiatorId, $recipientId))->toOthers();
    // Stocker l'ID de l'appel en cours dans la session si nécessaire
    session(['current_call_id' => $call->id]);

    return response()->json(['message' => 'L\'appel a été démarré avec succès.']);
}

public function joinCall(Request $request, $callId)
{
    // Rechercher l'appel par son ID
    $call = Call::findOrFail($callId);

    // Vérifier si l'utilisateur peut rejoindre l'appel (vous devrez implémenter la logique appropriée ici)

    // Mettre à jour le statut de l'appel
    $call->update([
        'status' => 'en_cours', // L'appel est maintenant en cours
        'accepted_at' => now(), // Enregistre l'heure d'acceptation
    ]);

    // Diffuser l'événement de rejoindre l'appel via WebSockets
    //event(new CallVideoJoined($call->id, auth()->id()));
    broadcast(new VoiceCallJoined($call->id, Auth::id()));

    return response()->json(['message' => 'Vous avez rejoint l\'appel avec succès.']);
}

public function declineCall(Request $request, $callId)
{
    // Rechercher l'appel par son ID
    $call = Call::findOrFail($callId);

    // Mettre à jour le statut de l'appel et enregistrer la raison du refus
    $call->update([
        'status' => 'refusé', // L'appel a été refusé
        'decline_reason' => $request->input('reason'), // Enregistre la raison du refus depuis la requête
    ]);

    // Diffuser l'événement de refuser l'appel via WebSockets
    //event(new CallVideoDeclined($call->id, auth()->id()));
    broadcast(new VoiceCallDeclined($call->id, Auth::id()));

    return response()->json(['message' => 'Vous avez refusé l\'appel.']);
}

public function acceptCall(Request $request, $callId)
{
    // Rechercher l'appel par son ID
    $call = Call::findOrFail($callId);

    // Mettre à jour le statut de l'appel
    $call->update([
        'status' => 'accepté', // L'appel a été accepté
    ]);

    // Diffuser l'événement d'accepter l'appel via WebSockets
    //event(new CallVideoAccepted($call->id, auth()->id()));
    broadcast(new VoiceCallAccepted($call->id, Auth::id()));

    return response()->json(['message' => 'Vous avez accepté l\'appel.']);
}

public function endCall(Request $request, $callId)
{
    // Recherchez l'appel par son ID
    $call = Call::findOrFail($callId);

    // Vérifiez que l'utilisateur est l'appelant ou le destinataire
    if ($call->initiator_id !== auth()->id() && $call->recipient_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Mettez à jour le statut de l'appel pour indiquer qu'il est terminé
    $call->update([
        'status' => 'terminé',
        'end_time' => now(), // Enregistre l'heure de fin
    ]);

    // Diffusez l'événement de fin d'appel via WebSockets à l'autre utilisateur
    $recipientId = $call->initiator_id === auth()->id() ? $call->recipient_id : $call->initiator_id;

    broadcast(new VoiceCallEnded($callId, auth()->id()));

    return response()->json(['message' => 'L\'appel a été terminé avec succès.']);
}



public function sendOffer(Request $request, $callId)
{
    // Recherchez l'appel par son ID
    $call = Call::findOrFail($callId);

    // Vérifiez que l'utilisateur est l'appelant
    if ($call->initiator_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Récupérez l'offre SDP depuis la requête
    $offerSdp = $request->input('offer_sdp');

    // Mettez à jour l'appel avec l'offre SDP
    $call->update(['offer_sdp' => $offerSdp]);

    // Diffusez l'offre SDP à l'utilisateur destinataire via WebSockets
    broadcast(new OfferReceived($offerSdp, $callId));

    return response()->json(['message' => 'Offer sent successfully']);
}

public function sendAnswer(Request $request, $callId)
{
    // Recherchez l'appel par son ID
    $call = Call::findOrFail($callId);

    // Vérifiez que l'utilisateur est le destinataire
    if ($call->recipient_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Récupérez la réponse SDP depuis la requête
    $answerSdp = $request->input('answer_sdp');

    // Mettez à jour l'appel avec la réponse SDP
    $call->update(['answer_sdp' => $answerSdp]);

    // Diffusez la réponse SDP à l'appelant via WebSockets
    broadcast(new AnswerReceived($answerSdp, $callId));

    return response()->json(['message' => 'Answer sent successfully']);
}

public function sendIceCandidate(Request $request, $callId)
{
    // Recherchez l'appel par son ID
    $call = Call::findOrFail($callId);

    // Vérifiez que l'utilisateur est l'appelant ou le destinataire
    if ($call->initiator_id !== auth()->id() && $call->recipient_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Récupérez le candidat ICE depuis la requête
    $iceCandidate = $request->input('ice_candidate');

    // Stockez le candidat ICE dans la base de données associé à l'appel

    // Diffusez le candidat ICE à l'autre utilisateur via WebSockets
    $recipientId = $call->initiator_id === auth()->id() ? $call->recipient_id : $call->initiator_id;

    broadcast(new IceCandidateReceived($iceCandidate, $callId, auth()->id()));

    return response()->json(['message' => 'ICE candidate sent successfully']);
}

 
}
