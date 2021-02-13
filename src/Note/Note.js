import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import configApi from '../configApi';
//import PropTypes from 'prop-types';
import { findNote } from '../notes-helpers'


export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
    match: {
      params: {}
    }
    
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log('Delete Button Pressed')

    fetch(`${configApi.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
       this.props.onDeleteNote(noteId)
       //this.props.history.push(`/`)
        
      })
      .catch(error => {
        console.error({ error })
      })
      //console.log('history' + this.props.history)
      
      this.props.history.push('/')
      
     
  }

  render() {
    const { name, id, modified } = this.props
 
    const { notes=[] } = this.context

 
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          
              <Link to={`/note/${id}`}>
              {name}
            </Link>
            
        
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified Test
            {' '}
            <span className='Date'>
              {modified}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

// Note.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   modified: PropTypes.string
// }