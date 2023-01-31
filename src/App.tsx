import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import useLocalStorage from './LocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { NewNote } from './page/NewNote'
import { NoteList } from './page/NoteList'
import { NoteLayout } from './page/NoteLayout'
import { Note } from './page/Note'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

// To handle the tag changes
export type RawNote = {
  id: string
} & RawNoteData


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  // handle create note
  function onCreateNote({ tags, ...data }: NoteData){
    console.log('tag selected', tags)
    console.log('note created', data)
    
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  // add a tag
  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList notes={notesWithTags} availableTags={tags}/>} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}> 
          <Route index element={<Note />} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )

}

export default App
