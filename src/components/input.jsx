import '../styles/input.css'

function InputField(props) {
    return (
    <input placeholder={props.placeholder} className="input-field" type={props.type} >

    </input> 
);}

export default InputField;