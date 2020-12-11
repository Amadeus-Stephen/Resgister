import React,{useState} from "react"


export default function ThrowMessage(props) {
    const [active , setActive] = useState(true);

    return (
        <div className={`alert alert-warning alert-dismissiable fade show ${active? "" : "false"}`}>
            <strong>{props.text}</strong>
            <button type="button" className="close" onClick={() => {setActive(!active)}}>
                <span>&times;</span>
            </button>
        </div>
    )
}