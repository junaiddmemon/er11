<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$mailTo = 'info@er11infra.com';
$mailBcc = 'junaidmemon9723@gmail.com';
$mailFrom = 'noreply@er11infra.com';
$companyName = 'ER11 Infrastructure Pvt. Ltd.';

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

if (strlen($name) > 120 || strlen($email) > 160 || strlen($phone) > 40 || strlen($subject) > 200 || strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'One or more fields exceed the allowed length.']);
    exit;
}

$emailSubject = $subject !== ''
    ? 'Website Enquiry: ' . $subject
    : 'New Website Contact Form Submission';

$bodyLines = [
    'A new contact form submission was received on the ER11 website.',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Subject: ' . ($subject !== '' ? $subject : 'Not specified'),
    '',
    'Message:',
    $message,
    '',
    '---',
    'Submitted: ' . date('d M Y, h:i A T'),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'),
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $companyName . ' <' . $mailFrom . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Bcc: ' . $mailBcc,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($mailTo, $emailSubject, implode("\n", $bodyLines), implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send your message right now. Please try again or contact us directly.']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been sent. Our team will contact you shortly.',
]);
