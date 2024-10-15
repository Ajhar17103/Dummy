import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const Loader = () => {
    return (
        <Container className="text-center" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row>
                <Col>
                    <Spinner animation="border" role="status" variant="primary" />
                    <h6>Loading, please wait...</h6>
                </Col>
            </Row>
        </Container>
    );
};

export default Loader;