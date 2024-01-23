<?php
require_once '../db/db.php';
require_once '../auth/checkSession.php';

$res = new stdClass();

if (isset($_SESSION['userID'])) {
    $json_data = file_get_contents("php://input");
    
    $data = json_decode($json_data, true);

    $chord_name = $data['chord_name'];
    $userID = $_SESSION['userID'];

    $db = new Db();
    $connection = $db->getConnection();

    $isBase = false;
    $stmt = $connection->prepare("SELECT ID FROM chords WHERE userID = ? AND name = ?");
    $ok = $stmt->execute([$userID, $chord_name]);
    if ($ok) {
        $chordIDs = $stmt->fetchAll();
        if (sizeof($chordIDs) == 0) {
            $isBase = true;
            $stmt = $connection->prepare("SELECT ID FROM base_chords WHERE name = ?");
            $stmt->execute([$chord_name]);
            $chordIDs = $stmt->fetchAll();
        }
        if (sizeof($chordIDs) == 0) {
            $res->status = false;
            $res->message = "No such chord";
            json_encode($res);
            exit();
        }
        $chordID = $chordIDs[0]["ID"];
        $sql = "";
        if ($isBase) {
            $sql = "DELETE FROM favourites_base WHERE userID = ? AND chordID IN (SELECT ID FROM base_chords WHERE ID = ?)";
        } else {
            $sql = "DELETE FROM favourites_user WHERE userID = ? AND chordID IN (SELECT ID FROM chords WHERE ID = ?)";
        }

        $stmt = $connection->prepare($sql);
        $ok = $stmt->execute([$userID, $chordID]);
    
        if ($ok) {
            $res->success = true;
            $res->message = "Favourite chord added successfully";
        } else {
            $res->success = false;
            $res->message = "Error adding favourite chord";
        }
    } else {
        $res->success = false;
        $res->message = "Error adding chord";
    }
} else {
    $res->success = false;
    $res->message = "User not logged in";
}

echo json_encode($res);