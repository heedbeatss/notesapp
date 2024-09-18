import React, { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteItemProps {
  note: Note;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onRemove: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdateTitle, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);

  const handleSave = () => {
    if (newTitle.trim() === "") {
      alert("O título não pode estar vazio!");
      return;
    }
    onUpdateTitle(note.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(note.title);
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <div className="title-editor">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className="editor-buttons">
            <button className="save" onClick={handleSave}>Salvar</button> {/* Botão de Salvar */}
            <button className="cancel" onClick={handleCancel}>Cancelar</button> {/* Botão de Cancelar */}
          </div>
        </div>
      ) : (
        <>
          <span className="note-title">{note.title}</span>
          <div className="note-buttons">
            <button className="edit" onClick={() => setIsEditing(true)}>Editar Título</button>
            <button className="remove" onClick={() => onRemove(note.id)}>Remover</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
