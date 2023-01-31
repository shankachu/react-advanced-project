import { useMemo, useState } from "react"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import ReactSelect from "react-select"
import { Tag } from "../App"
import { Note } from "../App"

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListPropos = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export function NoteList ({ availableTags, notes }: NoteListPropos){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    
    // filter displayed notes by the title
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === '' || note.title.toLowerCase().includes(title.toLocaleLowerCase()))
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])

    return <>
    <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal" >
                <Link to="/new">
                    <Button variant="primary">Create</Button>
                </Link>
                <Button variant="outline-secondary">Edit Tags</Button>
            </Stack>
        </Col>
        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="tags">
                        <Form.Label>tags</Form.Label>
                        <ReactSelect
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            isMulti
                            value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange={(newTags) => setSelectedTags(newTags.map(tag => {
                                return { label: tag.label, id: tag.value}
                            }))}
                        />
                    </Form.Group>
            </Col>
            </Row>
        </Form>

        <Row xs={1} sm={2} lg={3} className="g-3">
            {filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                </Col>
            ))}
        </Row>
    </Row>
    </>
}

function NoteCard({ id, title, tags }: SimplifiedNote){
    return <h1>Hi</h1>

}