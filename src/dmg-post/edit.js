/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { useState, useEffect } from '@wordpress/element';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { postID, postTitle, postURL } = attributes;
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        wp.apiFetch({ path: `/wp/v2/posts?search=${searchTerm}&per_page=10` }).then((posts) => setPosts(posts));
    }, [searchTerm]);

    const blockProps = useBlockProps();

    const onChangeSearchTerm = (term) => {
        setSearchTerm(term);
    };

    const onSelectPost = (id) => {
        const post = posts.find((post) => post.id === parseInt(id, 10));
        setAttributes({
            postID: post.id,
            postTitle: post.title.rendered,
            postURL: post.link,
        });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Post Selection">
                    <TextControl
                        label="Search for a post"
                        value={searchTerm}
                        onChange={onChangeSearchTerm}
                    />
                    <SelectControl
                        label="Select a post"
                        value={postID}
                        options={posts.map((post) => ({
                            label: post.title.rendered,
                            value: post.id,
                        }))}
                        onChange={(id) => onSelectPost(id)}
                    />
                </PanelBody>
            </InspectorControls>
            {postID ? (
                <p className="dmg-read-more">
                    Read More: <a href={postURL}>{postTitle}</a>
                </p>
            ) : (
                <p>No post selected.</p>
            )}
        </div>
    );
};

export default Edit;
