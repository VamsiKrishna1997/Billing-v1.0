<?php
    
session_start();

if(isset($_SESSION['username'])){

    require 'main.html';

}
else
{
    require 'session_expired.html';
 
}
    
?>
