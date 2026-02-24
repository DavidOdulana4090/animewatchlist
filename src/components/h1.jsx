import clsx from "clsx";
import '../styles/Heading.css'
function heading1(props) {
    return (
    <h1 className={clsx('heading-1',props.className)}>
        {props.text}
    </h1>  );
}

export default heading1;