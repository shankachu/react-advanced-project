import { useMemo, useState } from "react"
import { Form, Stack, Row, Col, Button, Card, Badge, Modal } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import ReactSelect from "react-select"
import { Tag } from "../App"
import styles from './NotesList.module.css'


type NoteListPropos = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type EditTagsModalProps = {
    show: boolean,
    availableTags: Tag[],
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export function NoteList ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListPropos){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const [editTagModalIsOpen, setEditTagModalIsOpen] = useState(false)
    
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
                <Button variant="outline-secondary" onClick={() => setEditTagModalIsOpen(true)}>Edit Tags</Button>
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
    <EditTagsModal availableTags={availableTags} show={editTagModalIsOpen} handleClose={() => setEditTagModalIsOpen(false)} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag} />
    </>
}

function NoteCard({ id, title, tags }: SimplifiedNote){
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className="fs-5">{title}</span>
                {tags.length > 0 && 
                    <Stack gap={1} direction='horizontal' className="justify-content-center flex-wrap">
                    {tags.map(tag => (
                        <Badge className='test-truncates' key={tag.id}>{tag.label}</Badge>
                    ))}
                    </Stack>
                }
            </Stack>
        </Card.Body>
    </Card>

}

function EditTagsModal({ availableTags, handleClose, show, onDeleteTag, onUpdateTag }: EditTagsModalProps) {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <Form.Control type="text" value={tag.label} onChange={e => onUpdateTag(tag.id, e.target.value)}/>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}