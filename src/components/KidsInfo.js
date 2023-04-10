import React from "react";
import styles from '../styles/kidsInfo.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const KidsInfo = ({childName, setChildName}) => {
  return (
    <Container className={`${styles.container}`}>
    <Form>
        <Form.Group className={`${styles.formGroup} d-flex`} controlId="kidsName">
            <Form.Label className={`${styles.formLabel}`}>
                First Name:
            </Form.Label>
            <Form.Control
                placeholder="Enter your first name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className={`${styles.formControl} d-flex`}
            />
        </Form.Group>
    </Form>
    </Container>);
};

export default KidsInfo;