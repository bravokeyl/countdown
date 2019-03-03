export default function getShortcode( props, name ) {
	const blockAttributes = props.attributes;
	const shortcodeAtts = new Map();
	// Toggle shortcode atts depending on block type.
	switch ( name ) {
		case 'fusion/countdown':
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
				backgroundColor = '#a0ce4e',
				backgroundImage,
				backgroundPosition,
				backgroundRepeat,
				counterBoxColor,
				counterTextColor,
				headingTextColor,
				subheadingTextColor,
				linkTextColor,
			} = blockAttributes;
			if(countdownEnd) {
				shortcodeAtts.set( 'countdown_end', countdownEnd );
			}
			if(timezone) {
				shortcodeAtts.set( 'timezone', timezone );
			}
			if(headingText) {
				shortcodeAtts.set( 'heading_text', headingText );
			}
			if(subheadingText) {
				shortcodeAtts.set( 'subheading_text', subheadingText );
			}
			if(showWeeks) {
				shortcodeAtts.set( 'show_weeks', 'yes' );
			} else {
				shortcodeAtts.set( 'show_weeks', 'no' );
			}
			if(borderRadius){
				shortcodeAtts.set( 'border_radius', borderRadius);
			}
			if(linkUrl){
				shortcodeAtts.set( 'link_url', linkUrl);
			}
			if(linkText){
				shortcodeAtts.set( 'link_text', linkText);
			}
			if(linkTarget){
				shortcodeAtts.set( 'link_target', borderRadius);
			}
			if(elementVisibility){
				shortcodeAtts.set( 'hide_on_mobile', elementVisibility);
			}
			if(cssClassName){
				shortcodeAtts.set( 'class', cssClassName);
			}
			if(cssId){
				shortcodeAtts.set( 'id', cssId);
			}
			if(backgroundColor){
				shortcodeAtts.set( 'background_color', backgroundColor);
			}
			if(backgroundImage){
				shortcodeAtts.set( 'background_image', backgroundImage);
			}
			if(backgroundPosition){
				shortcodeAtts.set( 'background_position', backgroundPosition);
			}
			if(backgroundRepeat){
				shortcodeAtts.set( 'background_repeat', backgroundRepeat);
			}
			if(counterBoxColor){
				shortcodeAtts.set( 'counter_box_color', counterBoxColor);
			}
			if(counterTextColor){
				shortcodeAtts.set( 'counter_text_color', counterTextColor);
			}
			if(headingTextColor){
				shortcodeAtts.set( 'heading_text_color', headingTextColor);
			}
			if(subheadingTextColor){
				shortcodeAtts.set( 'subheading_text_color', subheadingTextColor);
			}
			if(linkTextColor){
				shortcodeAtts.set( 'link_text_color', linkTextColor);
			}
			break;
	}

	// Build the shortcode string out of the set shortcode attributes.
	let shortcode = '[fusion_countdown';
	for ( const [ key, value ] of shortcodeAtts ) {
		shortcode += ' ' + key + '="' + value + '"';
	}
	shortcode += ']';

	return shortcode;
}
