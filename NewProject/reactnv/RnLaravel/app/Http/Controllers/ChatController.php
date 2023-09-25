<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetChatRequest;
use App\Http\Requests\StoreChatRequest;
use App\Models\User\Chat;
use App\Models\User\ChatParticipant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Gets chats
     *
     * @param GetChatRequest $request
     * @return JsonResponse
     */
    public function index(GetChatRequest $request): JsonResponse
    {
        $data = $request->validated();

        $isPrivate = 1;
        if ($request->has('is_private')) {
            $isPrivate = (int)$data['is_private'];
        }

       $chats = Chat::where(function ($query) {
        $query->where('created_by', auth()->user()->id)
              ->orWhereHas('participants', function ($subQuery) {
                  $subQuery->where('user_id', auth()->user()->id);
              });
    })
    ->with('lastMessage.user', 'participants.user')
    ->latest('updated_at')
    ->get();

        return $this->successWithMsg($chats);
    }

      /**
     * Stores a new chat
     *
     * @param StoreChatRequest $request
     * @return JsonResponse
     */
    public function store(StoreChatRequest $request): JsonResponse
    {
        $data = $this->prepareStoreData($request);
        if ($data['userId'] === $data['otherUserId']) {
            return $this->error('You cannot create a chat with yourself');
        }

        $previousChat = $this->getPreviousChat($data['otherUserId']);

        if($previousChat === null){

            $chat = Chat::create($data['data']);
            $chat->participants()->createMany([
                [
                    'user_id'=>$data['userId']
                ],
                [
                    'user_id'=>$data['otherUserId']
                ],

            ]);

            $chat->refresh()->load('lastMessage.user','participants.user');
            return $this->successWithMsg($chat);
        }

        return $this->successWithMsg($previousChat->load('lastMessage.user', 'participants.user'));
    }

    //--------------------------------------------------------------------------------------------------------------------

    public function group(StoreChatRequest $request): JsonResponse
    {
        $data = $this->prepareGroup($request);
        if ($data['userId'] === $data['otherUserId']) {
            return $this->error('You cannot create a chat with yourself');
        }

            $chat = Chat::create($data['data']);
            $participantIds = array_merge([$data['userId']], $data['otherUserId']);

            $participants = [];
            foreach ($participantIds as $participantId) {
                $participants[] = ['user_id' => $participantId];
            }

            $chat->participants()->createMany($participants);

            $chat->refresh()->load('lastMessage.user', 'participants.user');
            return $this->successWithMsg($chat);

        return $this->successWithMsg($previousChat->load('lastMessage.user', 'participants.user'));
    }
    public function leaveGroup(int $chatId): JsonResponse
{
    $userId =auth()->user()->id;

    $participant = ChatParticipant::where('chat_id', $chatId)
        ->where('user_id', $userId)
        ->first();

    if ($participant) {
        $chat = Chat::find($chatId);
        $chat->created_by = $chat->participants()->first()->user->id;
        $chat->save();

        $participant->delete();
        return $this->successWithMsg('You have left the group chat successfully.');
    } else {
        return $this->error('You are not a participant in this group chat.');
    }
}
    /**
     * Check if user and other user has previous chat or not
     *
     * @param int $otherUserId
     * @return mixed
     */
    private function getPreviousChat(int $otherUserId) : mixed {

        $userId = auth()->user()->id;

        return Chat::where('is_private',1)
            ->whereHas('participants', function ($query) use ($userId){
                $query->where('user_id',$userId);
            })
            ->whereHas('participants', function ($query) use ($otherUserId){
                $query->where('user_id',$otherUserId);
            })
            ->whereHas('participants', function ($query) {
                $query->havingRaw('COUNT(*) <= 2');
            })
            ->first();
    }


    /**
     * Prepares data for store a chat
     *
     * @param StoreChatRequest $request
     * @return array
     */
    private function prepareStoreData(StoreChatRequest $request) : array
    {
        $data = $request->validated();
        $otherUserId = (int)$data['user_id'];
        unset($data['user_id']);
        $data['created_by'] = auth()->user()->id;

        return [
            'otherUserId' => $otherUserId,
            'userId' => auth()->user()->id,
            'data' => $data,
        ];
    }
    private function prepareGroup(StoreChatRequest $request) : array
    {
        $data = $request->validated();
        $otherUserId = $data['user_id'];
        unset($data['user_id']);
        $data['created_by'] = auth()->user()->id;

        return [
            'otherUserId' => $otherUserId,
            'userId' => auth()->user()->id,
            'data' => $data,
        ];
    }



    /**
     * Gets a single chat
     *
     * @param Chat $chat
     * @return JsonResponse
     */
    public function show(Chat $chat): JsonResponse
    {
        $chat->load('lastMessage.user', 'participants.user');
        return $this->successWithMsg($chat);
    }

 /**
     * Gets all chats
     *
     * @return JsonResponse
     */
    public function getAllChats(): JsonResponse
    {
        $chats = Chat::with('lastMessage.user', 'participants.user')
            ->latest('updated_at')
            ->get();

        return $this->successWithMsg($chats);
    }

}
