import { useState } from 'react';

const NoteDisplay = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const [filtre, setFiltre] = useState('');

  const onChange = (e) => {
    setFiltre(e.target.value.split(' ').join(''));
  }
  const filterNotes = notes.filter((a) => a.title.toLowerCase().includes(filtre) || a.body.toLowerCase().includes(filtre));

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1> My Notes</h1>
      </div>
      <button onClick={onAddNote} className="addnote"> Nouvelle Note</button>
      <div className="app-sidebar-notes">
        <p className='searchbar'><input type="text" onChange={onChange} className="inputsearch" placeholder='Rechercher...'></input></p>

        {filtre === ''? 
        sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)} key={id}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}></button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Modifié le{" "}
              {new Date(lastModified).toLocaleDateString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        )) : 
        
        filterNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)} key={id}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}></button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Modifié le{" "}
              {new Date(lastModified).toLocaleDateString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))
        
        
        
        }
      </div>
    </div>
  );
};

export default NoteDisplay;