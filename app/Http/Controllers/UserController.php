<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::latest()->get(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $extension = $request->file('image')->getClientOriginalExtension();
        $fileNameToStore= Str::random(32).'_'.time().'.'.$extension;
        $request->file('image')->storeAs('public/images/', $fileNameToStore);
        $data['photo'] = $fileNameToStore;
        $user = User::create($data);

        return response()->json(new UserResource($user), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);
        return new UserResource($user, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $data = $request->validated();
        $user = User::find($id);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        if ($request->image) {
            $path = public_path('public/images/').$user->photo;
            if(file_exists($path)) {
                @unlink($path);
            }
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore= Str::random(32).'_'.time().'.'.$extension;
            $request->file('image')->storeAs('public/images/', $fileNameToStore);
            $data['photo'] = $fileNameToStore;
        }

        $user->update($data);

        return response()->json(new UserResource($user), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $path = public_path('storage/images/').$user->photo;
            if(file_exists($path)) {
                @unlink($path);
            }
            $user->delete();
        }

        return response()->noContent();
    }
}
