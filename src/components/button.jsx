import '../styles/button.css';

function button(props) {

	return (
		<button className="comp_button">
            {props.text}
        </button>
	);
}

export default button;
