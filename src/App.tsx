import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import CreateDogArticle from './page/createDogsArticle'
import useLocalStorage from './LocalStorage'

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

// To handle the tag changes
export type RawNote = {
  id: string
}

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>hi</h1>} />
        <Route path='/new' element={<CreateDogArticle />} />
        <Route path='/:id'> 
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )

}

export default App
