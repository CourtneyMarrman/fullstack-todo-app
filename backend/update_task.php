<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$status = $data->status;

$sql = "UPDATE tasks SET status='$status' WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Updated"]);
} else {
    echo json_encode(["error" => "Failed"]);
}
?>