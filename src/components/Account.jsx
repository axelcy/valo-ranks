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
    const progress = useRef(null)
    const rankTitle = useRef(null)
    
    useEffect(() => {
        const start = async () => {
            try {
                const _account = await new ValorantAPI(name).account()
                setAccount(_account)
                const _mmr = await new ValorantAPI(name).mmr()
                setMmr(_mmr)
                
                firstSection.current.style.backgroundImage = `url(${_account.card.wide})`
                rankTitle.current.style.color = tierColors[_mmr?.currenttierpatched]  
                progress.current.style.width = `${_mmr?.ranking_in_tier}%`
            }
            catch (err) {
                //
            }
        }
        start()
    }, [name])

    return (
        <article>
            <div>
                <img src={mmr?.images?.large} className="rank-image" draggable={false} />
                {
                    mmr?.mmr_change_to_last_game > 0 ? 
                    <div className="last-mmr" ><span className="mmr-green">+{mmr.mmr_change_to_last_game}</span></div> : // hacer modulo
                    <div className="last-mmr" ><span className="mmr-red">-{Math.abs(mmr.mmr_change_to_last_game)}</span></div>
                }
                
            </div>
            <div className="inner-container">
                <h3><a target="_blank" href={trackerUrl} draggable={false}>
                    {account?.name}<span className="nametag">#{account?.tag}</span></a>
                </h3>
                <section className="first-section" ref={firstSection}>
                    <div className="rank-title" ref={rankTitle}>{tierTranslations[mmr?.currenttierpatched]}</div>
                </section>
                <section className="second-section">
                    <div className="progress-container">
                        <div className="rank-progress-bar">
                            <div ref={progress} className="rank-progress"></div>
                        </div>
                    </div>
                    <div className="rank-rating-container">
                        <p className="rank-rating-text">RANK RATING</p>
                        <p className="rank-rating"><span className="actual-rating">{mmr?.ranking_in_tier ?? '0'}</span> / 100</p>
                    </div>
                </section>
            </div>
        </article>
    )
}

export default Account
