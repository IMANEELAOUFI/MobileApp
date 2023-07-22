<?php

namespace App\Http\Controllers;

use App\Events\NewMessageSent;
use App\Http\Requests\GetMessageRequest;
use App\Http\Requests\StoreMessageRequest;
use App\Models\User\Chat;
use App\Models\User\ChatMessage;
use App\Models\SavedMessage;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChatMessageController extends Controller
{
    /**
     * Gets chat messages.
     *
     * @param GetMessageRequest $request
     * @return JsonResponse
     */
    public function index($chatId, $page): JsonResponse
    {
        $pageSize = 10; // Adjust the page size as per your requirements

        $messages = ChatMessage::where('chat_id', $chatId)
            ->with('user')
            ->latest('created_at')
            ->simplePaginate($pageSize, ['*'], 'page', $page);

        return $this->successWithMsg($messages->getCollection());
    }

    /**
     * Create a chat message.
     *
     * @param StoreMessageRequest $request
     * @return JsonResponse
     */
   /**
 * Create a chat message.
 *
 * @param StoreMessageRequest $request
 * @return JsonResponse
 */
public function store(Request $request, $chatId): JsonResponse
{
    try {
        $data = [
            'user_id' => auth()->user()->id,
            'chat_id' => $chatId,
            'message' => $request->input('message'),
        ];
        
        if ($request->hasFile('image_path')) {
            // Handle the image upload
            $image = $request->file('image_path');
            $imageName = $image->getClientOriginalName();
            $path = $image->storeAs('app/public/images', $imageName, 'public');
            $data['image_path'] = Storage::url($path);
            $saved['user_id'] = auth()->user()->id;
            $saved['images'] = Storage::url($path);
            $saved['message'] = "hey";
           
        }

          

        if($request->hasFile('file_path') || $request->hasFile('image_path')){
            $savedMessage = SavedMessage::create($saved);
    
        }
        
        $chatMessage = ChatMessage::create($data);
        $chatMessage->load('user');
        
        // TODO: Send broadcast event to Pusher and send notification to OneSignal services
        //$this->sendNotificationToOther($chatMessage);
        
        return $this->successWithMsg($chatMessage, 'Message has been sent successfully.');
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Upload a file.
     *
     * @param Request $request
     * @return JsonResponse
     */
    /**
     * Send notification to other users.
     *
     * @param ChatMessage $chatMessage
     */
    private function sendNotificationToOther(ChatMessage $chatMessage): void
    {
        // TODO: Move this event broadcast to an observer
        broadcast(new NewMessageSent($chatMessage))->toOthers();

        $user = auth()->user();
        $userId = $user->id;

        $chat = Chat::where('id', $chatMessage->chat_id)
            ->with(['participants' => function ($query) use ($userId) {
                $query->where('user_id', '!=', $userId);
            }])
            ->first();

        if (count($chat->participants) > 0) {
            $otherUserId = $chat->participants[0]->user_id;

            $otherUser = User::where('id', $otherUserId)->first();
            $otherUser->sendNewMessageNotification([
                'messageData' => [
                    'senderName' => $user->username,
                    'message' => $chatMessage->message,
                    'chatId' => $chatMessage->chat_id,
                ],
            ]);
        }
    }

    public function savedmessages(): JsonResponse
    {

        $messages = SavedMessage::get();

        return $this->successWithMsg($messages);
    }
}
