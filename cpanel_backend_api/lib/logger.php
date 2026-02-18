<?php

require_once __DIR__ . '/response.php';

function require_superadmin_token(): void
{
    $config = require __DIR__ . '/../config/env.php';
    $expected = (string)($config['superadmin_token'] ?? '');

    if ($expected === '') {
        json_response(['success' => false, 'message' => 'Superadmin token not configured'], 500);
    }

    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $token = '';
    if (isset($headers['X-SUPERADMIN-TOKEN'])) {
        $token = (string)$headers['X-SUPERADMIN-TOKEN'];
    } elseif (isset($headers['x-superadmin-token'])) {
        $token = (string)$headers['x-superadmin-token'];
    }

    if (trim($token) !== $expected) {
        json_response(['success' => false, 'message' => 'Unauthorized'], 401);
    }
}

function ensure_logs_table(PDO $pdo): void
{
    $checkTable = $pdo->query("SHOW TABLES LIKE 'system_logs'")->fetch();
    if ($checkTable) {
        return;
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS system_logs (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        action VARCHAR(64) NOT NULL,
        entity VARCHAR(64) NOT NULL,
        entity_id VARCHAR(120) NULL,
        actor VARCHAR(160) NULL,
        ip_address VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL,
        meta JSON NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_action (action),
        INDEX idx_entity (entity),
        INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

function log_event(string $action, string $entity, ?string $entityId = null, array $meta = [], ?string $actor = null): void
{
    try {
        $pdo = db();
        ensure_logs_table($pdo);

        $stmt = $pdo->prepare('INSERT INTO system_logs (action, entity, entity_id, actor, ip_address, user_agent, meta)
                               VALUES (:action, :entity, :entity_id, :actor, :ip_address, :user_agent, :meta)');

        $stmt->execute([
            ':action' => $action,
            ':entity' => $entity,
            ':entity_id' => $entityId,
            ':actor' => $actor,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
            ':meta' => $meta ? json_encode($meta) : null,
        ]);

        // Retention: delete logs older than 100 days
        $pdo->exec("DELETE FROM system_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 100 DAY)");
    } catch (Throwable $error) {
        error_log('Logging failed: ' . $error->getMessage());
    }
}
