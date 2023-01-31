import { useState } from "react"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import ReactSelect from "react-select"
import { Tag } from "../App"

type NoteListPropos = {
    availableTags: Tag[]
}

export function NoteList ({ availableTags }: NoteListPropos){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')

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

        // render the note cards
    </Row>
    </>
}