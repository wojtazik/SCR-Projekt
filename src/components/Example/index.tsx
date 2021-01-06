import React from 'react'
import useComponent from './hook'
import './style.scss'

export type ExampleComponentInterface = {
    exampleProp: string
}

const Example = (props: ExampleComponentInterface) => {

    const { onClick, exampleActive } = useComponent(props)

    return (
        <div className="example">
            <h3 className="example__title">
                Example Component prop: {props.exampleProp}
                <br></br>
                {exampleActive ? "active" : "not active"}
                <br></br>
                <button onClick={onClick}>Click to set active</button>
            </h3>
        </div>
    )
}

export default Example

