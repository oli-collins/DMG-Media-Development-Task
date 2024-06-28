import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { postID } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} data-post-id={postID} className="dmg-read-more-placeholder">
            {/* Placeholder content to be replaced by PHP render callback */}
        </div>
    );
};

export default Save;
