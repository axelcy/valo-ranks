import { useEffect, useState } from "react"
import ValorantAPI from "../modules/api/ValorantAPI"
import { tierColors, tierTranslations } from '../mocks/ranks'
import useTrackerUrl from "../hooks/useTrackerUrl"

function Account({ name }) {
    const [account, setAccount] = useState({})
    const [mmr, setMmr] = useState({})
    const trackerUrl = useTrackerUrl(name)
    
    useEffect(() => async () => {
        setAccount(await new ValorantAPI(name).account())
        setMmr(await new ValorantAPI(name).mmr())
    }, [name])
    
    return (
        <>
            <h1>Nombre: {account?.name}</h1>
            <h3>Rango: {mmr?.currenttierpatched}</h3>
            <h4>Valorant Tracker perfil: <a target="_blank" href={trackerUrl}>Click</a></h4>
        </>
    )
}

export default Account
