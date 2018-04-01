<?php

    $data = $_GET['data'];
    $element = $_GET['element'];
    
    require 'dbConnection.php';
    
    if($element == "invoice")
        {
            $query = "select * from salesdata where invoice='$data'";
        }
    else if($element == "buyer")
        {
            $query = "select * from salesdata where buyer='$data'";
        }
    else if($element == "date")
        {
            
            $query = "select * from salesdata where date='$data'";
        }
     
    
    $result = mysqli_query($con, $query);
    
    if(mysqli_num_rows($result) > 0)
        {
            while($rows1 = mysqli_fetch_assoc($result))
        
            $row['response1'][] = $rows1;
        }
        
        $query2_invoice = $row['response1'][0]['invoice'];
    $query2 = "select * from itemdata ";
    $result2 = mysqli_query($con, $query2);
    
    if(mysqli_num_rows($result2) > 0){
        while($rows = mysqli_fetch_assoc($result2))
        {
           $row['response2'][] = $rows;
        }
    }
    
    echo json_encode($row);
    



?>
