<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;

class ChatMessage extends Model
{
    use HasFactory;

    protected $table = "chat_messages";
    protected $guarded = ['id'];
    protected $touches = ['chat'];
    protected $fillable = ['user_id', 'chat_id', 'message', 'file_path', 'image_path'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    // Accessor to decrypt the message attribute
    public function getMessageAttribute($value)
    {
        return Crypt::decrypt($value);
    } 

    // Mutator to encrypt the message attribute
    public function setMessageAttribute($value)
    {
        $this->attributes['message'] = Crypt::encrypt($value);
    }
}
