import { Form, Stack, Row, Col, FormLabel } from "react-bootstrap"
import CreatableReactSelect from 'react-select'

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
                            <CreatableReactSelect
                                isMulti
                                menuIsOpen={false} 
                                placeholder="Type a dog type..."
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control required as="textarea" rows={15} />
                </Form.Group>
            </Stack>
        </Form>
    )
}

export default CreateDogArticle