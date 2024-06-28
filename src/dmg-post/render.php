<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

 //By using the post ID to pull out the post url and title when rendering the block here, we are allowing for any update in url structure or post title that might have happened between the editor adding the block to the page and the user viewing the page.
$thePostId = $attributes['postID'];
?>
<p <?php echo get_block_wrapper_attributes(['class' => 'dmg-read-more']); ?>>
	<?php esc_html_e( 'Read More:', 'dmg-post' ); ?>
	<a href="<?php echo get_permalink($thePostId); ?>"><?php echo get_the_title($thePostId); ?></a>
</p>