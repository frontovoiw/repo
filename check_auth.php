<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['steam_user'])) {
    echo json_encode([
        'authenticated' => true,
        'user' => $_SESSION['steam_user']
    ]);
} else {
    echo json_encode([
        'authenticated' => false
    ]);
} 