import { useCallback, useState, MouseEvent, MouseEventHandler } from 'react'
import { ExampleComponentInterface } from './index'

export type ExampleComponentHookInterface = {
    exampleActive: boolean
    onClick: MouseEventHandler
}

const useComponent = (props: ExampleComponentInterface): ExampleComponentHookInterface => {
    const [exampleActive, onSetExampleActive] = useState<boolean>(false)

    const onClick = useCallback((event: MouseEvent) => {
        onSetExampleActive(!exampleActive)
    }, [onSetExampleActive, exampleActive])



    return {
        exampleActive,
        onClick
    }
}

export default useComponent