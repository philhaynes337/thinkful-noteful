import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import cuid from 'cuid';
import configApi from '../configApi';
import PropTypes from 'prop-types';

class AddNote extends Component {
	static contextType = ApiContext;
		state = {
			error: null
		};


	handleSubmit = e => {
		e.preventDefault();
		const { name, content, folderId } = e.target

		const notes = {

			id: cuid(),
			name: name.value,
			modified: Date(),
			folderId: folderId.value,
			content: content.value
			
		}
		console.log(notes);
	
		this.setState({ error: null })

	fetch(`${configApi.API_ENDPOINT}/notes`, {
		method: 'POST',
		body: JSON.stringify(notes),
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
			//console.log(this.context)
			
			name.value = ''
			folderId.value = ''
			content.value = ''

			this.context.addNote(data)
			
	})


		.catch (error => {
			console.log(error)
			this.setState({error})
	})
		this.props.history.push('/')

}


	render() {

		const { folders=[] } = this.context

		return(
			<div className='centerit'>
				<div className='keepLeft'>
					<h2>Create A Note</h2>
					<div className=''>
						<form onSubmit={this.handleSubmit}>
							<label htmlFor='name'>
								Name:<br />
							</label>
								<input type='text' id='name' name='name' required /><br />

							<label htmlFor='content'>
								Content: <br />
							</label>
								<textarea id='content' name='content' required /><br />

							<label htmlFor='folder'>
								Folder: <br />
							</label>
							<select id='folderId' name='folderId' required>

								{folders.map(folder =>

								<option value={folder.id} key={folder.id} id='folderId' name='folderId'>{folder.name}</option>
														
								)}
									
							</select>
							<br />

							<button type='submit'>Add Note</button>
						</form>

					</div>
				</div>
			</div>

			)
	}
}
AddNote.propTypes = {
	history: PropTypes.object
};

export default AddNote