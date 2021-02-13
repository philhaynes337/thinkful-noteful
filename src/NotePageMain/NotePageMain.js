import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, parseInt(noteId)) || { content: 'No Content' }
    


    return (
      <section className='NotePageMain'>
        <Note
          id={noteId}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.object,
  params: PropTypes.array
}

