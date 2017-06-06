<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'created_by',
    ];

    public function getNameAttribute()
    {
        return ucfirst($this->first_name). ' '.ucfirst($this->last_name);
    }

    public function setNameAttribute()
    {
      $this->attributes['name'] = ucfirst($this->first_name). ' '.ucfirst($this->last_name);
    }

}
