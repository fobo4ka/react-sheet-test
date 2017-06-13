import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
	state = {
		value: this.props.mask.replace(/[|§*]/g, '_'),
		quantityInMask: this.props.mask.replace(/[|§*]/g, '_').split("_").length - 1,
		quantityInput: 0,
		defenitions: {
			'*': '.',
			'|': '[0-9]',
			'§': '[a-zа-яЁё]'
		},
	};

	isMaskSymbol = (symbol) => {
		return symbol === '|' || symbol === '§' || symbol === '*';
	}

  	handlePaste = (event) => {
	    const {
	    	defenitions,
	    	value,
	    	quantityInput
	    } = this.state;

	    const mask = this.props.mask;

	    let newValue = value;
	    let newQuantityInput = quantityInput;
	    let index = 0;
	    let pastedData = (event.clipboardData.getData('Text')).split('');


	    pastedData.forEach((symbol) => {
	      	if (index < mask.length) {
			  	for (index; !this.isMaskSymbol(mask[index]) && index < mask.length - 2; index++) {}

	        	if (symbol.match(new RegExp(`${defenitions[mask[index]]}`, 'ig'))) {
					newValue = `${newValue.slice(0,index)}${symbol}${newValue.slice(index + 1)}`;
					newQuantityInput++;
					index++;
	        	}
	      	}
	    });

		this.setState({value: newValue, quantityInput: newQuantityInput});
	}

	handleKeyDown = (event) => {
		event.preventDefault();

		const {
	    	defenitions,
	    	value,
	    	quantityInput
	    } = this.state;

	    const mask = this.props.mask;
	    const newSymbol = event.key;

	  	let index = this.refs.input.selectionStart;
	    let newValue = value;
	   	let newPosition = index;
	    let newQuantityInput = quantityInput;

	    if ((newSymbol === 'Backspace' || newSymbol === 'Delete') && index > 0) {
	    	for (index; !this.isMaskSymbol(mask[index - 1]) && index > 1; index--) {}

			if(index !== 0 && this.isMaskSymbol(mask[index - 1])) {
				newValue = `${value.slice(0,index - 1)}_${value.slice(index)}`;
				newPosition = index - 1;
			}

	    } else {
			if (index < mask.length && newSymbol.length === 1) {
				for (index; !this.isMaskSymbol(mask[index]) && index < mask.length - 2; index++) {}

				if(newSymbol.match(new RegExp(`${defenitions[mask[index]]}`, 'ig'))) {
					newValue = `${value.slice(0,index)}${newSymbol}${value.slice(index + 1)}`;
					newQuantityInput++;
					newPosition = index + 1;
				}
	    	}
	  	}
		this.setState(
			{
				value: newValue,
				quantityInput: newQuantityInput
			},
			() => this.refs.input.selectionStart = this.refs.input.selectionEnd = newPosition
		);
	}

	render() {
		const {
			value,
			quantityInMask,
			quantityInput
		} = this.state;

		const labelText = this.props.labelText;
		const inputClassNames = quantityInMask === quantityInput ? 'Input-field' : 'Input-field Input-field-error';
		const wrapperClassNames = quantityInMask === quantityInput ? 'Input-wrapper' : 'Input-wrapper Input-wrapper-error';

		return (
			<div className={wrapperClassNames}>
				<label htmlFor="Input-field" className="Input-label">{ labelText }</label>
				<input
					ref="input"
					className={inputClassNames}
					value={value}
					onKeyDown={this.handleKeyDown}
					onPaste={this.handlePaste}
					onChange={()=>{}} />
	        </div>
		);
	}
}

export default Input;