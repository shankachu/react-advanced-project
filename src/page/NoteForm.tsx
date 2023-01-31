import { FormEvent, useRef, useState } from "react"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { NoteData, Tag } from "../App"
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void,
    onAddTag: (tags: Tag) => void,
    availableTags: Tag[]
}

export function NoteForm({ onSubmit, onAddTag, availableTags } : NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        console.log(titleRef.current)
        console.log(markdownRef.current)
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="tags">
                            <Form.Label>tags</Form.Label>
                            <CreatableSelect 
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
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
                <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control ref={markdownRef} required as="textarea" rows={15} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                    
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm