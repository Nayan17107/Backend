import { Fragment, useRef } from "react"

function UseRef() {
    const nameref = useRef("")
    console.log(nameref.current)

    const handalClick = () => {
        nameref.current.innerHTML = "This is Useref"
    }
    return (
        <Fragment>
            <h2 ref={nameref}>this is fragment </h2>
            <button onClick={() => handalClick()}>click</button>
        </Fragment>
    )
}

export default UseRef;