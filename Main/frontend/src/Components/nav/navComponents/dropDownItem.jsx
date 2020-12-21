import React from "react"
import {Card,Accordion, Button} from "react-bootstrap"
export default function LeftNavDrop(props) {

    return (
        <Card className="card primebg">
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link " eventKey={`${props.num}`}>
                    {props.title}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${props.num}`}>
                <Card.Body variant="prime" >{props.children}</Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}