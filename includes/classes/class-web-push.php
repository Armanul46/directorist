<?php
/**
 * Web Push notification support.
 *
 * @package Directorist
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'Directorist_Web_Push' ) ) :

    class Directorist_Web_Push {
        /**
         * Create Web Push related database tables.
         *
         * @return void
         */
        public static function create_tables() {
            global $wpdb;

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';

            $charset_collate    = $wpdb->get_charset_collate();
            $subscriptions_table = self::get_subscriptions_table_name();
            $log_table           = self::get_log_table_name();

            dbDelta(
                "CREATE TABLE {$subscriptions_table} (
                    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                    user_id bigint(20) unsigned NOT NULL,
                    endpoint text NOT NULL,
                    endpoint_hash char(64) NOT NULL,
                    public_key varchar(255) NOT NULL,
                    auth_token varchar(255) NOT NULL,
                    content_encoding varchar(50) NOT NULL DEFAULT 'aes128gcm',
                    user_agent text NULL,
                    status varchar(20) NOT NULL DEFAULT 'active',
                    created_at datetime NOT NULL,
                    updated_at datetime NOT NULL,
                    last_used_at datetime NULL,
                    PRIMARY KEY  (id),
                    UNIQUE KEY endpoint_hash (endpoint_hash),
                    KEY user_id (user_id),
                    KEY status (status),
                    KEY updated_at (updated_at)
                ) {$charset_collate};"
            );

            dbDelta(
                "CREATE TABLE {$log_table} (
                    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                    event varchar(100) NOT NULL,
                    recipient_user_id bigint(20) unsigned NOT NULL DEFAULT 0,
                    recipient_type varchar(30) NOT NULL DEFAULT '',
                    channel varchar(20) NOT NULL,
                    status varchar(20) NOT NULL,
                    failure_reason text NULL,
                    notification_title varchar(255) NOT NULL DEFAULT '',
                    notification_message text NULL,
                    created_at datetime NOT NULL,
                    PRIMARY KEY  (id),
                    KEY event (event),
                    KEY recipient_user_id (recipient_user_id),
                    KEY recipient_type (recipient_type),
                    KEY channel (channel),
                    KEY status (status),
                    KEY created_at (created_at)
                ) {$charset_collate};"
            );
        }

        /**
         * Get push subscriptions table name.
         *
         * @return string
         */
        public static function get_subscriptions_table_name() {
            global $wpdb;

            return $wpdb->prefix . 'directorist_push_subscriptions';
        }

        /**
         * Get notification log table name.
         *
         * @return string
         */
        public static function get_log_table_name() {
            global $wpdb;

            return $wpdb->prefix . 'directorist_notification_log';
        }
    }

endif;
