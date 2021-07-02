import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStreams } from "../../actions";

class StreamCreate extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = (formProps) => {
		const className = `field ${formProps.meta.error && formProps.meta.touched ? "error" : ""}`;
		console.log(formProps);
		return (
			<div className={className}>
				<label>{formProps.label}</label>
				<input {...formProps.input} autoComplete="off" />
				{this.renderError(formProps.meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		console.log("formValues", formValues);
		this.props.createStreams(formValues);
	};

	render() {
		console.log(this.props);
		return (
			<>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
					<Field name="title" component={this.renderInput} label="Enter Title" />
					<Field name="description" component={this.renderInput} label="Enter Description" />
					<button className="ui button primary">Submit</button>
				</form>
			</>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "You must enter a title!";
	}
	if (!formValues.description) {
		errors.description = "You must enter a description!";
	}
	return errors;
};

const formWrapped = reduxForm({ form: "streamCreate", validate: validate })(StreamCreate);

export default connect(null, { createStreams })(formWrapped);
