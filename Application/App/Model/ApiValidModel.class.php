<?php

namespace App\Model;


class ApiValidModel extends \Think\Model{
    
    public function __construct($name = '', $tablePrefix = '', $connection = '') {
        parent::__construct($name, $tablePrefix, $connection);
//        $this->db($linkNum, $config);
    }
    
}
