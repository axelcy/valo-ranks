import { useEffect, useRef, useState } from "react"
import ValorantAPI from "../modules/api/ValorantAPI"
import { tierColors, tierTranslations } from '../mocks/ranks'
import useTrackerUrl from "../hooks/useTrackerUrl"
import './styles/Account.css'

function Account({ name }) {
    const [account, setAccount] = useState({})
    const [mmr, setMmr] = useState({})
    const trackerUrl = useTrackerUrl(name)
    const firstSection = useRef(null)
    
    useEffect(() => async () => {
        const _account = await new ValorantAPI(name).account()
        setAccount(_account)
        setMmr(await new ValorantAPI(name).mmr())
        // filter: contrast(0.5);
        firstSection.current.style.backgroundImage = `url(${_account.card.wide})`

    }, [name])

    return (
        <article>
            <section className="first-section" ref={firstSection}>
                <h2><a target="_blank" href={trackerUrl}>{account?.name}<span className="nametag">#{account?.tag}</span></a></h2>
            </section>
            <section className="second-section">
                <img src={mmr?.images?.large} className="rank-image" draggable={false} />
                <div className="rank-title">{mmr?.currenttierpatched}</div>
                <div className="rank-progress-bar">
                    <div className="animate-stripes absolute left-0 top-0 h-full rounded-lg bg-[#23fed7]"></div>
                </div>
            </section>
        </article>
    )
}

export default Account
