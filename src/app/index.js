/**
 * External Dependencies
 */
import { map, sample } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { ColorControl } from '../components';
import allColors from '../data/colors';

class ColorsPanel extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			colors: props.colors,
		};

		this.onAddClick = this.onAddClick.bind( this );
		this.onChange = this.onChange.bind( this );
		this.onDelete = this.onDelete.bind( this );
	}

	onAddClick() {
		this.setState( ( prevState ) => ( {
			colors: [ ...prevState.colors, sample( allColors ) ],
		} ) );
	}

	onChange( current, newColor ) {
		this.setState( ( { colors } ) => {
			return {
				colors: colors.map( ( color ) => {
					if ( current === color.color ) {
						return { ...color, ...newColor };
					}
					return color;
				} ),
			};
		} );
	}

	onDelete( color ) {
		this.setState( ( prevState ) => ( {
			colors: prevState.colors.filter( ( c ) => c.color !== color ),
		} ) );
	}

	render() {
		const { colors } = this.state;

		return (
			<div>
				<h3>{ __( 'Custom Colors', 'wc-custom-block-styles' ) }</h3>
				{ map( colors, ( { color, name }, i ) => {
					return (
						<ColorControl
							key={ i }
							color={ color }
							name={ name }
							onChange={ this.onChange }
							onDelete={ this.onDelete }
						/>
					);
				} ) }
				<div>
					<Button onClick={ this.onAddClick } isDefault>
						{ __( 'Add Color', 'wc-custom-block-styles' ) }
					</Button>
				</div>
			</div>
		);
	}
}

export default ColorsPanel;