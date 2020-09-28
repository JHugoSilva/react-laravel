<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Role;

class EmployeeController extends Controller
{
    public function index()
    {
        $data = Role::get();
        $response['data'] = $data;
        $response['success'] = true;
        return $response;
    }

    public function create(Request $request)
    {
        try {
            $insert['name_lastname'] = $request['name'];
            $insert['email'] = $request['email'];
            $insert['city'] = $request['city'];
            $insert['direction'] = $request['address'];
            $insert['phone'] = $request['phone'];
            $insert['rol'] = $request['rol'];

            Employee::insert($insert);

            $response['message'] = 'Salvo com sucesso!';
            $response['success'] = true;
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }

    public function list()
    {
        try {
            $data = Employee::with('role')->get();
            $response['data'] = $data;
            $response['message'] = 'Carregado com sucesso!';
            $response['success'] = true;
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
}
