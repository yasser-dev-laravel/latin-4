<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function current(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
} 