<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(LoginRequest $loginRequest) {

        if (!Auth::attempt($loginRequest->validated())) {
            return response()->json([
                'errors' => 'Usuário e/ou senhas inválidos'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $loginRequest->user();

        $userToken = $user->createToken('ACCESS_TOKEN')->plainTextToken;

        return response()->json([
            'message' => 'Usuário Logado com Sucesso!',
            'token' => $userToken,
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $registerRequest) {

        $data = $registerRequest->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('ACCESS_TOKEN')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ],Response::HTTP_CREATED);
    }

    public function user() {
        return response()->json(auth()->user());
    }

    public function logout(Request $request) {

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->noContent();
    }
}
