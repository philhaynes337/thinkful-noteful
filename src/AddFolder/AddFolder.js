import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import configApi from '../configApi';
import cuid from 'cuid';
import PropTypes from 'prop-types';

class AddFolder extends Component {
		static contextType = ApiContext;
			state = {
				error: null
			};

	handleSubmit = e => {
		e.preventDefault()
		const { name } = e.target
		//console.log(name);
		const folders = {
			id: cuid(),
			name: name.value
		}
		

	this.setState({ error: null })
	fetch(`${configApi.API_ENDPOINT}/folders`, {
		method: 'POST',
		body: JSON.stringify(folders),
		headers: {
			'content-type': 'application/json'
		}
	})  

	.then(res => {
		if (!res.ok) {
			return res.json().then(error => {
				throw error
			})
		}
		return res.json()
	})

	.then (data => {
		console.log(this.context)
		//data.id = ''
		name.value = ''
		this.context.addFolder(data)
	})
	.catch (error => {
		console.log(error)
		this.setState({error})
	})
	this.props.history.push('/')
	}

	render() {
		const { error } = this.state

		return(

			<div className='centerit addFolder'>
				
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="name">
						Add Folder:
					</label><br />
						<input type='text' name='name' id='name' required /><br />
						<button type='submit'>Add Folder</button>
				</form>
				{error && <p>{error.message}</p>}
			</div>

			)
	}

	
}

// AddFolder.propTypes = {
// 		history: PropTypes.string
// 	}

export default AddFolder