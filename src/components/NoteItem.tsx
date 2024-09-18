import React from 'react';

interface NoteItemProps {
  id: number;
  title: string;
  removeNote: (id: number) => void;
  updateNoteTitle: (id: number, title: string) => void;
  startEditingTitle: (id: number) => void; // Recebe a função
  viewNote: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, title, removeNote, updateNoteTitle, startEditingTitle, viewNote }) => {
  return (
    <li>
      <span>{title}</span>
      <button onClick={() => startEditingTitle(id)}>Editar Título</button> {/* Inicia a edição */}
      <button onClick={() => viewNote(id)}>Ver Nota</button>
      <button onClick={() => removeNote(id)}>Remover</button>
    </li>
  );
};

export default NoteItem;
