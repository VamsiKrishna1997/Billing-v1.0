<?php
    require 'dbConnection.php';
    
    $data = json_decode(file_get_contents("php://input"));
    
    $items = $data->item_info;
    $invoice = $data->invoice;
    $date = $date = date('Y-m-d', strtotime(str_replace('-', '/', $data->date)));
    $buyer = $data->buyer;
    $grandtotal = $data->grandtotal;
    $sgst = $data->sgst;
    $cgst = $data->cgst;
    $igst = $data->igst;
    $total = $data->total;
    $transport = $data->transport;
    $buyeraddress = $data->buyeraddress;
    
    $query = "insert into salesdata (invoice,date,buyer,buyeraddress,grandtotal,sgst,cgst,igst,total,transport) values('$invoice','$date','$buyer','$buyeraddress','$grandtotal','$sgst','$cgst','$igst','$total','$transport')";
    if(mysqli_query($con, $query))
    {
        
        for ($i = 0;$i< sizeof($items); $i++)
        {
            $item = $items[$i]->name;
            $hsn = $items[$i]->hsn;
            $qty = $items[$i]->qty;
            $price = $items[$i]->price;
            $query2 = "insert into itemdata (invoice,itemname,qty,price,hsn) values ('$invoice','$item','$qty','$price','$hsn')";
            mysqli_query($con, $query2);
        }
    }
    
  
?>