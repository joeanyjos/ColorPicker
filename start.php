<!DOCTYPE HTML>
<?php
//kijkt of username & password goed zijn
if (isset($_POST['submit'])){
    $un=$_POST['username'];
    $pw=$_POST['password'];
    //if username + password kloppen, redirect 
    if ($un=='username' && $pw=='password'){
        header("location:colors.html");
        exit();
        //else echo alert
    } else {
        echo '<script language="javascript">';
        echo 'alert("Incorrect username or password")';
        echo '</script>';
    }
}?>

<html>
<head>
    <meta charset="utf-8">
    <title>LOGIN</title>
    <link rel="stylesheet" type="text/css" href="css.css">
</head>
<body>
<div id="main">
    <form class="box" method="post">
        <h1>Login</h1>
        <input type="text" name="username" placeholder="USERNAME" required>
        <input type="password" name="password" placeholder = "PASSWORD" required>
        <input type="submit" name="submit" id="sub">
    </form>
</div>

</body>
</html>

