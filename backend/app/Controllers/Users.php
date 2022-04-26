<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Users extends ResourceController
{
    use ResponseTrait;
    
    public function __construct() {       
        $this->model = new \App\Models\UserModel();                                 
    }  
    

    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data);
    }


    /* ingresa/actualiza un usuario */
    public function user()
    {
        $errors = false;
        $message = ['success' => 'Data Updated'];
        
        $data = $this->model->setData();        

        if($id = $this->model->getId())
        {
            $findById = $this->model->find(['id' => $id]);
            if(! $findById) return $this->failNotFound('No Data Found');

            $this->model->update($id, $data);    
        }
        else{
            $this->model->save($data);
            $message = ['success' => 'Data Inserted'];
        }

		// if($errors = $this->model->errors()){ return $this->fail($errors); }				
        $messages = $this->model->errors() ? : $message;
        $errors = count($this->model->errors()) > 0;     

        return $this->respondCreated($this->setMessage($messages, $errors));
    }


    /* retorna la información de un usuario */
    public function show($id = null)
    {        
        $data = $this->model->find(['id' => $id]);
        if(!$data) return $this->failNotFound('No Data Found');
        return $this->respond($data[0]);
    }


    /* borra un usuario */
    public function delete($id = null)
    {        
        $findById = $this->model->find(['id' => $id]);
        if(!$findById) return $this->failNotFound('No Data Found');
        $this->model->delete($id);

        return $this->respondCreated($this->setMessage(['success' => 'Data Deleted']));
    }


    /* retorna el array con las respuestas a la acción solicitada */
    private function setMessage($messages, $error=null)
    {
        return [
            'status' => 201,
            'error' => $error,
            'messages' => [
                $messages
            ]
        ];        
    }    
    

}
