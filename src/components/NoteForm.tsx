import React, { useState } from 'react';

interface NoteFormProps {
  addNote: (title: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addNote(title);
      setTitle(''); // Limpar o campo após adicionar
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o título da nota"
      />
      <button type="submit">Adicionar Nota</button>
    </form>
  );
};

export default NoteForm;
