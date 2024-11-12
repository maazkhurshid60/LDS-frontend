import React, { useState } from 'react'
import ToggleButton from '../../components/Toggle/ToggleButton'
import axios from 'axios'
import { baseUrl } from '../../apiservices/baseUrl/baseUrl'

const ServerDownPage = () => {
    const [isServerDown, setIsServerDown] = useState(false)
    const serverDownFunction = async () => {
        const data = { status: isServerDown }
        try {
            const response = await axios.post(`${baseUrl}/server/control`, data)
            console.log("response>>>>>>>>>>>>>>>>>>>", response)
        } catch (error) {
            console.log("error>>>>>>>>>>>>>>>>>>>>>>", error)
        }
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