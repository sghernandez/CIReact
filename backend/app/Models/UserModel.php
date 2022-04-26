<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $id;
    protected $table = 'users';
    protected $primaryKey = 'id';


    protected $returnType = 'object'; 
    protected $allowedFields = ['name', 'email'];

    protected $useTimestapms = FALSE;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $validationRules;
    protected $data;    

    protected $validationMessages = [
       'email' => ['is_unique' => 'The email already exists.']
    ];

    protected $skipValidation = FALSE;
    protected $request;

    public function __construct()
    {
        parent::__construct();     
        
        $this->setId();
        $this->validationRules = [
            'name' => 'required|min_length[3]|max_length[200]',            
            'email' => "required|valid_email|is_unique[users.email,$this->primaryKey,$this->id]",
        ];            

    }   


    public function setId($id = 0)
    {
        $request = \Config\Services::request();          
        $this->id = intval($id ? : $request->getVar('id'));
    }


    public function getId() {
        return $this->id;
    }    
    
    
    public static function setData()
    {
        $request = \Config\Services::request();
        return  [ 
            'name' => $request->getVar('name'),
            'email' => $request->getVar('email'),
        ];                           
    } 

}
