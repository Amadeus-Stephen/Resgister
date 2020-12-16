import React from "react"
import {Link } from "react-router-dom"
import {Card , Button} from "react-bootstrap"
export default function leftNavCard(props) {
        return (
		<Card className="primebg">
  			<Card.Header className="card-header" id="headingTwo">
      			<h5 className="mb-0">
        			<Button variant="link" className=" collapsed"  >
						<Link to={`${props.link}`}>
						{props.text}
						</Link>	
        			</Button>
    			</h5>
			</Card.Header>
		</Card>
        )
}