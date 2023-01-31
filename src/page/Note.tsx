import { useNote } from "./NoteLayout";
import { Form, Stack, Row, Col, Badge } from "react-bootstrap"

export function Note() {
    const note = useNote()

    return <>
        <Row className="align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                     <Stack gap={1} direction='horizontal' className="flex-wrap">
                     {note.tags.map(tag => (
                         <Badge className='test-truncates' key={tag.id}>{tag.label}</Badge>
                     ))}
                     </Stack>
                )}
            </Col>
        </Row>
    </>
}