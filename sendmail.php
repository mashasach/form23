<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer\src\Exception.php';
require 'phpmailer\src\PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ua', 'phpmailer/language/');
$mail->IsHTML(true);

//від кого лист
$mail->setFrom('test@test.com', 'Тестовий лист з сайту');
//кому відправляти
$mail->addAddress('mashasachenko1807@gmail.com');
//тема листа
$mail->Subject = 'Лист із тестового сайту';
//Тіло листа
$body = '<h1> Лист з тестового сайту!</h1>';

if(trim(!empty($_POST['name']))){
   $body.='<p><strong>Імя: </strong> '.$POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
   $body.='<p><strong>E-mail:</strong> '.$POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))){
   $body.='<p><strong>Телефон: </strong> '.$POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
   $body.='<p><strong>Повідомлення: </strong> '.$POST['message'].'</p>';
}
$mail->Body=$body;

//відправка
if(!$mail->send()){
   $message ='Помилка';
}else{
   $message = 'Дані відправлені!';
}

$response = ['message'=> $message];

header ('Content-type: application/json');
echo json_encode($response);