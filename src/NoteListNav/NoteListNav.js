import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AddFolder from '../AddFolder/AddFolder';
import PropTypes from 'prop-types';

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  showFolder(url) {
    this.props.history.push(url);
  }

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {//{countNotesForFolder(notes, folder.id)} -->}
                }
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='centerit addFolder'>

          <button 
            type='button'
            onClick={() => this.showFolder('/add-folder')}
          >
            <br />
              Add Folder 
          </button>


        </div>
      </div>
    )
  }
}
NoteListNav.propTypes = {
  history: PropTypes.object
}