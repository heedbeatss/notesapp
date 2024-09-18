  import React from 'react';
  import NoteItem from './NoteItem';
  import { Note } from '../App';





  // Definindo as props do NoteList, incluindo a função startEditingTitle
  export interface NoteListProps {
    notes: Note[];
    removeNote: (id: number) => void;
    updateNoteTitle: (id: number, newTitle: string) => void;
    viewNote: (id: number) => void;
    startEditingTitle: (id: number) => void; // Adiciona essa linha
  }

  const NoteList: React.FC<NoteListProps> = ({
    notes,
    removeNote,
    updateNoteTitle,
    viewNote,
    startEditingTitle, // Recebe a função aqui também
  }) => {
    return (
      <div className="note-list">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <button className="view" onClick={() => viewNote(note.id)}>Ver Nota</button>
            <button className="edit" onClick={() => startEditingTitle(note.id)}>Editar Título</button>
            <button className="remove" onClick={() => removeNote(note.id)}>Remover Nota</button>
          </div>
        ))}
      </div>
    );
  };

  export default NoteList;
