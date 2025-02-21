<?php
require 'vendor/autoload.php';

use Invisnik\LaravelSteamAuth\SteamAuth;

session_start();

$steam = new SteamAuth([
    'apiKey' => 'YOUR_STEAM_API_KEY', // Получите API ключ на https://steamcommunity.com/dev/apikey
    'returnUrl' => 'http://your-domain.com/steam_auth.php', // Замените на ваш домен
    'realm' => 'http://your-domain.com' // Замените на ваш домен
]);

if ($steam->validate()) {
    $steamId = $steam->getSteamId();
    $steamInfo = $steam->getUserInfo();
    
    // Сохраняем информацию о пользователе в сессию
    $_SESSION['steam_user'] = [
        'steamid' => $steamId,
        'name' => $steamInfo->personaname,
        'avatar' => $steamInfo->avatarfull
    ];
    
    // Перенаправляем на главную страницу
    header('Location: index.html');
    exit;
} 