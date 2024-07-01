<?php
/*
 * Plugin Name:       DMG Media Test
 * Plugin URI:        https://www.olivercollins.co.uk/
 * Description:       Plugin created by Oliver Collins for the DMG Media Test
 * Version:           0.1
 * Author:            Oliver Collins
 * Author URI:        https://www.olivercollins.co.uk/
 * Text Domain:       dmg-media-test
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dmg_blocks_dmg_post_block_init() {
	register_block_type(
		__DIR__ . '/build/dmg-post'
	);
}
add_action( 'init', 'dmg_blocks_dmg_post_block_init' );



// The read more search function and WP-CLI Command
function dmg_read_more_search($to_date = null, $from_date = null) {

	if($to_date == null) {
		// Sets current date/time if the to date isn't set
		$to_date = date("U");
	} else {
		$to_date = strtotime($to_date);
	}

	if($from_date == null) {
		// Sets from date to be 30 days before the current date if not set
		$from_date = $to_date - (30 * (24 * 60 * 60));
	} else {
		$from_date = strtotime($from_date);
	}

	$readMoreBlockArgs = array(
		'post_type'		=> 'post',
		'post_status'	=> 'publish',
		's'				=> 'dmg-blocks/dmg-post',
		'date_query' => array(
			array(
				'after' => $from_date,
				'before' => $to_date,
				'inclusive' => true,
			),
		),
	);

	$readMoreBlockQuery = new WP_Query($readMoreBlockArgs);

	// The function returns an array of just the IDs from the results
	return wp_list_pluck( $readMoreBlockQuery->posts, 'ID');
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	class DMG_Read_More_Search_Command {
		// This command will run the dmg_read_more_search fucntion defined above,
		// with two optional arguments, date-before and date-after
		// Example of the command that can be run is: wp dmg_read_more_search 2023-12-31 2023-01-01
		public function __invoke( $args, $assoc_args ) {
			list( $date_before, $date_after ) = $args;

			try {
				$results = dmg_read_more_search( $date_before, $date_after );

				if ( empty( $results ) ) {
					WP_CLI::log( "No results found for the given date range." );
				} else {
					foreach ( $results as $result ) {
						WP_CLI::log( print_r( $result, true ) );
					}
				}
			} catch ( Exception $e ) {
				WP_CLI::error( "An error occurred: " . $e->getMessage() );
			}
		}
	}

	WP_CLI::add_command( 'dmg_read_more_search', 'DMG_Read_More_Search_Command' );
}
