<div class="wrap">
    <?php
        /**
         * Fires before single directory edited header
         * @since 8.0
         */
        do_action( 'directorist_before_directory_type_edited' );
	?>
	
    <?php
        $pre_made_types = $data['pre_made_types'] ?? array();

        if ( $pre_made_types ) {
            foreach ( $pre_made_types as $type ) {
                ?>
                <a class="directorist-add-types" data-url="<?php echo esc_url( $type['url'] ?? '' ); ?>">
                    <?php esc_html_e( $type['name'] ?? '' ); ?>
                </a>
                <?php
            }
        }
    ?>

</div>