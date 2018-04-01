<?php

    require 'dbConnection.php';
    $query = "select invoice from salesdata";
    if($result = mysqli_query($con, $query)){
        
        while ($row = mysqli_fetch_assoc($result)){
            
            $invoice_number  = $row;
        }
    }
    
    echo json_encode($invoice_number);

?>