<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedMessage extends Model
{
    use HasFactory;
    protected $table = "saved_messages";

    protected $fillable = ['docs','images', 'user_id' , 'message'];
}
