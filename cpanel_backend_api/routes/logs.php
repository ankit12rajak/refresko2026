<?php

require_once __DIR__ . '/../lib/logger.php';

function logs_list(): void
{
    require_superadmin_token();

    $limit = (int)($_GET['limit'] ?? 50);
    $limit = max(1, min(200, $limit));
    $page = (int)($_GET['page'] ?? 1);
    $page = max(1, $page);
    $offset = ($page - 1) * $limit;

    $action = trim((string)($_GET['action'] ?? ''));
    $entity = trim((string)($_GET['entity'] ?? ''));
    $search = trim((string)($_GET['search'] ?? ''));

    $pdo = db();
    ensure_logs_table($pdo);

    $where = [];
    $params = [];

    if ($action !== '') {
        $where[] = 'action = :action';
        $params[':action'] = $action;
    }

    if ($entity !== '') {
        $where[] = 'entity = :entity';
        $params[':entity'] = $entity;
    }

    if ($search !== '') {
        $where[] = '(entity_id LIKE :search OR actor LIKE :search OR action LIKE :search OR entity LIKE :search)';
        $params[':search'] = '%' . $search . '%';
    }

    $whereSql = $where ? (' WHERE ' . implode(' AND ', $where)) : '';

    $countStmt = $pdo->prepare('SELECT COUNT(*) AS total FROM system_logs' . $whereSql);
    $countStmt->execute($params);
    $total = (int)($countStmt->fetch()['total'] ?? 0);

    $sql = 'SELECT id, action, entity, entity_id, actor, ip_address, user_agent, meta, created_at
            FROM system_logs' . $whereSql . ' ORDER BY id DESC LIMIT :limit OFFSET :offset';
    $stmt = $pdo->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $logs = $stmt->fetchAll();

    json_response([
        'success' => true,
        'logs' => $logs,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'total_pages' => $limit > 0 ? (int)ceil($total / $limit) : 1,
        ]
    ]);
}
