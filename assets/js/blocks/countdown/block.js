/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import Gridicon from 'gridicons';
import moment from 'moment';
import { InspectorControls } from '@wordpress/editor';
import {
	SelectControl, FormToggle, ColorIndicator,
	DatePicker, TimePicker, DateTimePicker, TextControl, 
	ExternalLink, PanelBody, ColorPalette, ColorPicker, Placeholder, Spinner 
} from '@wordpress/components';
import PropTypes from 'prop-types';

class CountDown extends Component {
	constructor() {
		super( ...arguments );
		this.state = {};
	}

	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const {
			countdownEnd,
			timezone,
			headingText,
			subheadingText,
			showWeeks,
			borderRadius,
			linkUrl,
			linkText,
			linkTarget,
			elementVisibility,
			cssClassName,
			cssId,
			backgroundColor = '#f00',
			backgroundImage,
			backgroundPosition,
			backgroundRepeat,
			counterBoxColor,
			counterTextColor,
			headingTextColor,
			subheadingTextColor,
			linkTextColor,
		} = attributes;
		const colors = [ 
			{ name: 'red', color: '#f00' }, 
			{ name: 'white', color: '#fff' }, 
			{ name: 'blue', color: '#00f' }, 
		];;
		const color = '#f00';
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'General', 'bk-gb-counter' ) }
					initialOpen
				>
					{ __('Countdown Timer End', 'bk-gb-counter') }
					<TimePicker
						help="Set the end date and time for the countdown time."
						currentTime={ countdownEnd }
						onChange={(countdownEnd) => setAttributes({countdownEnd})}
					/>
					<SelectControl
						label="Timezone"
						help="Choose which timezone should be used for the countdown calculation. Default currently set to {default_timezone}."
						value={ timezone }
						options={ [
							{ label: 'Default', value: '' },
							{ label: 'Timezone of site', value: 'site_time' },
							{ label: 'Timezone of user', value: 'user_time' },
						] }
						onChange={ ( timezone ) => { setAttributes({timezone}); } }
					/>
					<div style={{marginBottom: 16}}>
						<FormToggle 
							checked={ showWeeks }
							onChange={ () => setAttributes({ showWeeks: ! showWeeks }) } 
						/>
						<span style={{marginLeft: 16}}>{__('Show Weeks', 'bk-gb-counter')}</span>
					</div>
					<TextControl
						label="Border Radius"
						help="Choose the radius of outer box and also the countdown. In pixels (px), ex: 1px."
						value={borderRadius}
						onChange={(borderRadius) => {setAttributes({borderRadius})}}
					/>
					<TextControl
						label="Heading Text"
						value={headingText}
						onChange={(headingText) => {setAttributes({headingText})}}
					/>
					<TextControl
						label="Subheading Text"
						value={subheadingText}
						onChange={(subheadingText) => {setAttributes({subheadingText})}}
					/>
					<TextControl
						type="url"
						label="Link URL"
						value={linkUrl}
						onChange={(linkUrl) => {setAttributes({linkUrl})}}
					/>
					<TextControl
						label="Link Text"
						value={linkText}
						onChange={(linkText) => {setAttributes({linkText})}}
					/>
					<SelectControl
						label="Link Target"
						help="_self = open in same window _blank = open in new window Default currently set to {linkTarget}."
						value={ linkTarget }
						options={ [
							{ label: 'Default', value: '' },
							{ label: '_self', value: '_self' },
							{ label: '_blank', value: '_blank' },
						] }
						onChange={ ( linkTarget ) => { setAttributes({linkTarget}); } }
					/>
					<SelectControl
						label="Element Visibility"
						help="Choose to show or hide the element on small, medium or large screens. You can choose more than one at a time. Each of the 3 sizes has a custom width setting on the Fusion Builder Elements tab in the Theme Options."
						value={ elementVisibility }
						multiple
						options={ [
							{ label: 'Small Screen', value: 'small-visibility' },
							{ label: 'Medium Screen', value: 'medium-visibility' },
							{ label: 'Large Screen', value: 'large-visibility' },
						] }
						onChange={ ( elementVisibility ) => { setAttributes({elementVisibility}); } }
					/>
					<TextControl
						label="CSS Class"
						value={cssClassName}
						onChange={(cssClassName) => {setAttributes({cssClassName})}}
					/>
					<TextControl
						label="CSS ID"
						value={cssId}
						onChange={(cssId) => {setAttributes({cssId})}}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Background', 'bk-gb-counter' ) }
					initialOpen
				>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( value ) => setAttributes({backgroundColor: value.hex}) }
						disableAlpha
					/>
					<p>
						Choose a background color for the countdown wrapping box. Leave empty for default value of default_color.
						Reset to default.Using default value.
					</p>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( value ) => setAttributes({backgroundColor: value.hex}) }
						disableAlpha
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Design', 'bk-gb-counter' ) }
					initialOpen
				>	
					Countdown Color
					{/* <ColorIndicator colorValue="#f00" /> */}
					<ColorPicker
						color={ counterBoxColor }
						onChangeComplete={ ( value ) => setAttributes({counterBoxColor: value.hex}) }
					/>
					{/* <ColorPalette 
						colors={ colors } 
						value={ counterBoxColor }
						onChange={ ( counterBoxColor ) => setAttributes( { counterBoxColor } ) } 
					/> */}
					Countdown Text Color
					<ColorPicker
						color={ counterTextColor }
						onChangeComplete={ ( value ) => setAttributes({counterTextColor: value.hex}) }
						disableAlpha
					/>
					Heading Text Color
					<ColorPicker
						color={ headingTextColor }
						onChangeComplete={ ( value ) => setAttributes({headingTextColor: value.hex}) }
						disableAlpha
					/>
					Subheading Text Color
					<ColorPicker
						color={ subheadingTextColor }
						onChangeComplete={ ( value ) => setAttributes({subheadingTextColor: value.hex}) }
						disableAlpha
					/>
					Link Text Color
					<ColorPicker
						color={ linkTextColor }
						onChangeComplete={ ( value ) => setAttributes({linkTextColor: value.hex}) }
						disableAlpha
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		const { attributes } = this.props;
		const {
			countdownEnd,
			timezone,
			showWeeks,
		} = attributes;
		const end = moment(countdownEnd);
		const now = moment();
		const diffWeeks = end.diff(now, 'weeks');
		const diffDays = end.diff(now, 'days');
		const diffHours = end.diff(now, 'hours');
		const diffMins = end.diff(now, 'minutes');
		const diffSecs = end.diff(now, 'seconds');
		const finDiffDays = diffDays - (diffWeeks*7);
		const finDiffHours = diffHours - (diffDays*24);
		const finDiffMins = diffMins - ((diffDays*24)+finDiffHours)*60;
		const finDiffSecs = diffSecs - ((diffDays*24+finDiffHours)*60+finDiffMins)*60;
		return (
			<Fragment>
				{ this.getInspectorControls() }
				<div className="bk-editor-ui">
					<Placeholder
						icon={ <Gridicon icon="scheduled" /> }
						label={ __(
							'Countdown',
							'bk-gb-counter'
						) }
					>
						{ showWeeks ? `${diffWeeks} Weeks,` : null} {showWeeks ? finDiffDays : diffDays} Days, {finDiffHours} Hours, {finDiffMins} Mins, {finDiffSecs} Secs
					</Placeholder>
				</div>
			</Fragment>
		);
	}
}

CountDown.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default CountDown;