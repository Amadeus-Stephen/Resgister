import React from "react"
import {Link } from "react-router-dom"
import {Card , Button} from "react-bootstrap"
export default function leftNavCard(props) {
        return (
		<Card className="primebg">
  			<Card.Header>
      			<h5 className="mb-0">
					<Link to={`${props.link}`}>
        				<Button variant="link" onClick={props.handleClick}>
							{props.text}
        				</Button>
					</Link>	
    			</h5>
			</Card.Header>
		</Card>
        )
}