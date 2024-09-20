import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css'; // Importando o CSS corretamente

export interface Note {
  id: number;
  title: string;
  content?: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>(''); // Novo estado para o título editado

// Função para adicionar uma nova nota
const addNote = (title: string) => {
  if (title.length > 30) {
    alert("O título da nota deve ter no máximo 30 caracteres.");
    return;
  }

  const newNote: Note = { id: Date.now(), title };
  setNotes([...notes, newNote]);
  setEditingNoteId(newNote.id); // Inicia a edição da nova nota
};


  // Função para atualizar o conteúdo da nota
  const updateNoteContent = (id: number, content: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
  };

  // Função para atualizar o título da nota
  const updateNoteTitle = (id: number, newTitle: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, title: newTitle } : note));
    setEditingTitleId(null); // Fecha o modo de edição de título
    setNewTitle(''); // Limpa o título editado
  };

  // Função para remover uma nota
  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null); // Limpa a nota em edição se for removida
    }
    if (editingTitleId === id) {
      setEditingTitleId(null); // Limpa a edição do título se for removida
    }
  };

  // Função para visualizar a nota, iniciando a edição do conteúdo
  const viewNote = (id: number) => {
    setEditingNoteId(id); // Mostra o conteúdo da nota para edição
  };

  // Função para iniciar a edição do título
  const startEditingTitle = (id: number) => {
    setEditingTitleId(id); // Inicia a edição do título
    setNewTitle(notes.find(note => note.id === id)?.title || ''); // Define o título atual no estado de edição
  };

  // Função para salvar o conteúdo da nota e fechar o modo de edição
  const saveNoteContent = () => {
    setEditingNoteId(null); // Fecha o editor de nota (textarea) após salvar
  };

  // Função para salvar o novo título e sair do modo de edição
  const saveTitle = () => {
    if (newTitle.trim()) { // Verifica se o título não está vazio
      updateNoteTitle(editingTitleId!, newTitle); // Atualiza o título da nota
    }
  };

  const currentEditingNote = notes.find(note => note.id === editingNoteId);
  const currentEditingTitleNote = notes.find(note => note.id === editingTitleId);

  return (
    <div className="app-container">
      <h1>Bloco de Notas</h1>
      <NoteForm addNote={addNote} />

      {/* Renderização da lista de notas */}
      <NoteList
        notes={notes}
        removeNote={removeNote}
        updateNoteTitle={updateNoteTitle}
        viewNote={viewNote}
        startEditingTitle={startEditingTitle}
      />

      {/* Se estiver editando o título */}
      {currentEditingTitleNote && (
        <div className="title-editor">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <button className='save' onClick={saveTitle}>Salvar</button> {/* Adicionando o botão de Salvar */}
          <button onClick={() => setEditingTitleId(null)}>Cancelar</button>
        </div>
      )}

      {/* Se estiver editando o conteúdo da nota */}
      {currentEditingNote && (
        <div className="note-editor">
          <textarea
            value={currentEditingNote.content || ''}
            onChange={(e) => updateNoteContent(currentEditingNote.id, e.target.value)}
            placeholder="Escreva sua nota aqui..."
            autoFocus
          />
          {/* Botão para salvar o conteúdo da nota */}
          <button onClick={saveNoteContent}>Salvar Nota</button>
        </div>
      )}
    </div>
  );
};

export default App;
