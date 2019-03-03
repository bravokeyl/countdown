/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Gridicon from 'gridicons';
import { registerBlockType } from '@wordpress/blocks';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block';
import getShortcode from '../../utils/get-shortcode';

registerBlockType( 'bkgb/countdown', {
	title: __( 'Fusion: Countdown', 'bk-gb-counter' ),
	icon: <Gridicon icon="scheduled" />,
	category: 'fusion',
	keywords: [ __( 'Fusion', 'bk-gb-counter' ) ],
	description: __(
		'Displays a countdown timer.',
		'bk-gb-counter'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes: {
		countdownEnd: {
			type: 'string',
			default: '2019-06-22 00:00:00',
		},
		timezone: {
			type: 'string',
			default: 'site-time'
		},
		headingText: {
			type: 'string',
			default: ''
		},
		subheadingText: {
			type: 'string',
			default: ''
		},
		showWeeks: {
			type: 'boolean',
			default: true,
		},
		borderRadius: {
			type: "string",
			default: '',
		},
		linkUrl: {
			type: "string",
			default: '',
		},
		linkText: {
			type: "string",
			default: '',
		},
		linkTarget: {
			type: "string",
			default: '_self',
		},
		elementVisibility: {
			type: "array",
			default: ["small-visibility","medium-visibility","large-visibility"],
		},
		cssClassName: {
			type: "string",
			default: '',
		},
		cssId: {
			type: "string",
			default: '',
		},
		backgroundImage: {
			type: "string",
			default: '',
		},
		backgroundPosition: {
			type: "string",
			default: '',
		},
		backgroundRepeat: {
			type: "string",
			default: '',
		},
		counterBoxColor: {
			type: "string",
			default: '',
		},
		counterTextColor: {
			type: "string",
			default: '',
		},
		headingTextColor: {
			type: "string",
			default: '',
		},
		subheadingTextColor: {
			type: "string",
			default: '',
		},
		linkTextColor: {
			type: "string",
			default: '',
		},
	},

	edit( props ) {
        return <Block { ...props } />
	},

	save( props ) {
		const classes = 'bk-countdown-render';
		const sht = getShortcode( props, 'fusion/countdown' );
		return (
			<RawHTML className={ classes }>
				{ sht }
			</RawHTML>
		);
	},
} );
