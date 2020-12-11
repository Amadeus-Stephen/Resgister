import React from "react"

export default function leftNavCard(props) {
        return (
		<div className="card primebg">
  			<div className="card-header" id="headingTwo">
      			<h5 className="mb-0">
        			<button className="btn btn-link collapsed" >
						{props.text}
        			</button>
    			</h5>
			</div>
		</div>
        )
}