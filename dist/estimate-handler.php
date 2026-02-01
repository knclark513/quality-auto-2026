<?php
// public/estimate-handler.php

// REPLACE THIS WITH YOUR EMAIL ADDRESS
$to = "Karl.Clark@BigIntelligenceAI.comM"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Collect Form Data
    $name = $_POST['name'] ?? 'Unknown';
    $email = $_POST['email'] ?? 'No email';
    $phone = $_POST['phone'] ?? 'No phone';
    $year = $_POST['year'] ?? '';
    $make = $_POST['make'] ?? '';
    $model = $_POST['model'] ?? '';
    $message_content = $_POST['message'] ?? '';

    $subject = "New Estimate Request: $year $make $model";

    // 2. Prepare Email Headers & Boundary
    $boundary = md5(time());
    $headers = "From: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // 3. Construct Email Body (Text)
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    
    $body .= "You have received a new estimate request:\n\n";
    $body .= "Name: $name\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n";
    $body .= "Vehicle: $year $make $model\n";
    $body .= "Damage Description:\n$message_content\n\n";
    
    // 4. Handle File Attachments
    if (!empty($_FILES['photos']['name'][0])) {
        $total_files = count($_FILES['photos']['name']);
        
        for ($i = 0; $i < $total_files; $i++) {
            $file_name = $_FILES['photos']['name'][$i];
            $file_tmp = $_FILES['photos']['tmp_name'][$i];
            
            if (is_uploaded_file($file_tmp)) {
                $content = file_get_contents($file_tmp);
                $content = chunk_split(base64_encode($content));
                
                $body .= "--$boundary\r\n";
                $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
                $body .= "Content-Description: $file_name\r\n";
                $body .= "Content-Disposition: attachment; filename=\"$file_name\"; size=" . filesize($file_tmp) . ";\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $body .= $content . "\r\n";
            }
        }
    }

    $body .= "--$boundary--";

    // 5. Send Email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Success";
    } else {
        http_response_code(500);
        echo "Mail failed";
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
?>