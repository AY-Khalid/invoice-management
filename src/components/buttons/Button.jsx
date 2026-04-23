import "./Button.css"

export default function Button(props){

    return(
        <button onClick={props.action} className={props.appearance}>{props.font} {props.text}</button>
    )
}