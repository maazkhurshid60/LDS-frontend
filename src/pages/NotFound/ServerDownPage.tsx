import React, { useState } from 'react'
import ToggleButton from '../../components/Toggle/ToggleButton'
import axios from 'axios'
import { baseUrl } from '../../apiservices/baseUrl/baseUrl'
import { toast } from 'react-toastify'

const ServerDownPage = () => {
    const [isServerDown, setIsServerDown] = useState(false)
    const serverDownFunction = async () => {
        alert(isServerDown)
        const data = { status: isServerDown }
        try {
            const response = await axios.post(`${baseUrl}/server/control`, data)
            console.log("response>>>>>>>>>>>>>>>>>>>", response)
            toast?.success(`${response?.data}`)
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