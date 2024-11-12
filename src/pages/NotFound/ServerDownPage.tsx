import React, { useState } from 'react'
import ToggleButton from '../../components/Toggle/ToggleButton'

const ServerDownPage = () => {
    const [isServerDown, setIsServerDown] = useState(false)
    const serverDownFunction = () => {
        alert(isServerDown)
    }
    return (
        <>
            <ToggleButton
                label={"Down the Server"}
                value={isServerDown}
                onChange={() => setIsServerDown(!isServerDown)}
            />

            <button onClick={serverDownFunction}>Save</button>
        </>
    )
}

export default ServerDownPage