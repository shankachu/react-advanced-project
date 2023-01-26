import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

function CreateDogArticle() {
    return (
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="golden retriver"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="tags">
                            <Form.Label>tags</Form.Label>
                            <CreatableSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control required as="textarea" rows={15} />
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

export default CreateDogArticle