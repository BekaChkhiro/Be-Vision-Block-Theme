import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';

// Add CSS to make frontend match editor exactly
import './frontend.css';

registerBlockType('bevision/text-with-image-block', {
  title: __('Text with Image, version 2', 'bevision'),
  icon: 'format-image',
  category: 'design',
  attributes: {
    title: {
      type: 'string',
      default: 'Text with image, version 2',
    },
    content: {
      type: 'string',
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    imageId: {
      type: 'number',
    },
    imageUrl: {
      type: 'string',
    },
    imageAlt: {
      type: 'string',
      default: '',
    },
  },
  edit: Edit,
  save,
  example: {
    attributes: {
      title: 'Text with image, version 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageUrl: 'https://placehold.it/800x600',
    },
  },
});
