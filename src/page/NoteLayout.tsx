import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"
type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps){
    const { id } = useParams()
    console.log('from params', id);

    // find one note from all notes
    const note = notes.find(n => n.id === id)

    if (note == null) return <Navigate to="/" replace />

    return <Outlet context={note} />
}

// Helper function to allow child elements use the context of parent outlet
export function useNote() {
    return useOutletContext<Note>()
}