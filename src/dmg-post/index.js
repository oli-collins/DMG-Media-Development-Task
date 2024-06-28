/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/*registerBlockType('dmg-blocks/dmg-post', {
    title: 'DMG Post',
    icon: 'admin-links',
    category: 'common',
    attributes: {
        postID: {
            type: 'number',
            default: 0,
        },
        postTitle: {
            type: 'string',
            default: '',
        },
        postURL: {
            type: 'string',
            default: '',
        },
    },
    supports: {
        className: false,
        customClassName: false,
    },
    Edit,
    Save,
    render: 'dmg_render_block_core_notice', // Add this line to specify the render callback
});*/

/*import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';*/

registerBlockType('dmg-blocks/dmg-post', {
    title: 'DMG Read More',
    icon: 'text',
    category: 'common',
    attributes: {
        postID: {
            type: 'number',
            default: 0,
        },
        postTitle: {
            type: 'string',
            default: '',
        },
        postURL: {
            type: 'string',
            default: '',
        },
    },
    supports: {
        className: false,
        customClassName: false,
    },
    edit: Edit,
    save: Save,
});

