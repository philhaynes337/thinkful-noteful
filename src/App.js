import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import Header from './files/Header';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import ErrorBoundary from  './ErrorBoundary';
import ApiContext from './ApiContext';
import configApi from './configApi';
import PropTypes from 'prop-types';



class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${configApi.API_ENDPOINT}/notes`),
            fetch(`${configApi.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

 handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

addFolder = folder => {
    this.setState({
        folders: [ ...this.state.folders, folder]
    })
};

addNote = note => {
    this.setState({
        notes: [ ...this.state.notes, note]
    })
};


    renderNavRoutes() {
        return (
            <div>
                <ErrorBoundary>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListNav}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageNav} />
                    <Route path="/add-folder" component={NotePageNav} />
                    <Route path="/add-note" component={NotePageNav} />
                </ErrorBoundary>
            </div>
        );
    }

    renderMainRoutes() {
        return (
            <div>
                <ErrorBoundary>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListMain}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageMain} />
                    <Route path="/add-note" component={AddNote} />
                    <Route path='/add-folder' component={AddFolder} />
                </ErrorBoundary>
            </div>
        );
    }

    render() {
         const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote
        };



        return (
            <>
            <ApiContext.Provider value={value}>
                <div>
                
                    <header>
                        <ErrorBoundary>
                            <Header />
                        </ErrorBoundary>
                    </header>

                    <main className='row'>
                        
                            <div className='sidebar'>
                           
                                {this.renderNavRoutes()}
                            </div>

                            <div className='maincontent'>
                                {this.renderMainRoutes()}

                            </div>
                       
                    </main>

                </div>
            </ApiContext.Provider>
            </>
        );
    }
}

App.propTypes = {
    folders: PropTypes.array,
    notes: PropTypes.array
}

export default App;