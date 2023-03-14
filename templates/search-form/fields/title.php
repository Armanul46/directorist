<?php
/**
 * @author  wpWax
 * @since   6.6
 * @version 7.6
 */

if ( ! defined( 'ABSPATH' ) ) exit;

$value = isset( $_REQUEST['q'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['q'] ) ) : '';
?>

<div class="directorist-search-field directorist-form-group directorist-search-query">
	<input class="directorist-form-element" type="text" name="q" value="<?php echo esc_attr( $value ); ?>" placeholder="<?php echo esc_attr( $data['placeholder'] ); ?>" <?php echo ! empty( $data['required'] ) ? 'required="required"' : ''; ?>>
</div>