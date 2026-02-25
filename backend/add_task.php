<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit();
}

$title = $conn->real_escape_string($data->title);
$description = $conn->real_escape_string($data->description);

$sql = "INSERT INTO tasks (title, description) VALUES ('$title', '$description')";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Task added successfully"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>