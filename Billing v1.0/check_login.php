<?php

if(isset($_GET['username']) && isset($_GET['password']) )
{
       require 'dbConnection.php';
       
       $username = $_GET['username'];
       $password = $_GET['password'];
       $query = "select username,password from login where username='$username' and password = '$password' ";
       $result = mysqli_query($con, $query);
       $count = mysqli_num_rows($result);
       if($count == 1){
           echo "<script>document.getElementById('errlbl').style.display = 'none';</script>";
           session_start();
           $_SESSION['username'] = $username;
           header("location:main.php");
       }
       else
       {
          echo "<script>document.getElementById('errlbl').style.display = 'block';</script>";
       }
}
?>