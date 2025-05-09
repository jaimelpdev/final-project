<?php
function loadTranslations($lang = 'en') {
    $filePath = __DIR__ . "/../public/locales/$lang/common.json";
    if (file_exists($filePath)) {
        $translations = json_decode(file_get_contents($filePath), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $translations;
        }
    }
    return [];
}

function t($key, $translations) {
    return $translations[$key] ?? $key;
}
?>