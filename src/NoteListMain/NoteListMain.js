import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
//import AddNote from '../AddNote/AddNote';
import PropTypes from 'prop-types';


export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

showNote(url) {
  this.props.history.push(url);
}

  render() {
    const { folderid } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderid)
    //console.log('Notes for Folder:' + notesForFolder)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                history={this.props.history}
              />
            </li>
          )}
        </ul>
        <div className='centerit'>
          <button
            tag={Link}           
            type='button'           
            onClick={() => this.showNote('/add-note')}
          >
            
            <br />
            Note
          </button>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object,
  params: PropTypes.array
}