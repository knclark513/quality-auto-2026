<?php
// public/save_inventory.php

// 1. Start the Session (Must be first!)
session_start();

// Allow React to talk to this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle "Preflight" requests (browser security check)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// --- SECURITY CHECK START ---
// If the user hasn't logged in via login.php, stop them here.
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    http_response_code(401); // 401 = Unauthorized
    echo json_encode(["status" => "error", "message" => "Unauthorized. Please login."]);
    exit;
}
// --- SECURITY CHECK END ---

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Get the raw JSON data sent by React
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if data is valid
if ($data !== null) {
    // Save the data to inventory.json
    // JSON_PRETTY_PRINT makes the file human-readable
    if (file_put_contents('inventory.json', json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["status" => "success", "message" => "Inventory saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to write to file. Check permissions."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
}
?>