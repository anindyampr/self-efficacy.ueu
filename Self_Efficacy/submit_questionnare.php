<?php
require_once 'config.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $stmt = $pdo->prepare("INSERT INTO responses (name, email, age, gender, total_score, category, response_data) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        $total_score = array_sum($data['responses']);
        $category = ($total_score <= 65) ? 'Rendah' : (($total_score > 86) ? 'Tinggi' : 'Sedang');
        
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['age'],
            $data['gender'],
            $total_score,
            $category,
            json_encode($data['responses'])
        ]);
        
        echo json_encode([
            'success' => true,
            'total_score' => $total_score,
            'category' => $category
        ]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}
?>