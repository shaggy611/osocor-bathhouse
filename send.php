<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST allowed"]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "No JSON received"]);
    exit;
}

$token = "#";
$chat_id = "#";

$name  = $data['name']  ?? '—';
$email = $data['email'] ?? '—';
$phone = $data['phone'] ?? '—';
$communication = $data['communication'] ?? '—';

$text = "📝 Нова заявка з форми\n"
      . "👤 Ім'я: $name\n"
      . "📧 Email: $email\n"
      . "📞 Телефон: $phone\n"
      . "💬 Спосіб зв'язку: $communication";

$url = "https://api.telegram.org/bot$token/sendMessage";

$params = [
    "chat_id" => $chat_id,
    "text"    => $text,
    "parse_mode" => "HTML"
];

$options = [
    "http" => [
        "method"  => "POST",
        "header"  => "Content-Type: application/json",
        "content" => json_encode($params)
    ]
];

$result = file_get_contents($url, false, stream_context_create($options));

echo json_encode(["ok" => true]);
