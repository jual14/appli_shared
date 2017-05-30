<?php
    $data['file'] = $_FILES;
    $data['radio'] = $_POST;
 
    echo json_encode($data);
?>