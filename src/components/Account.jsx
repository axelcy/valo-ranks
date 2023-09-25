import { useEffect, useRef, useState } from "react"
import ValorantAPI from "../modules/api/ValorantAPI"
import { tierColors, tierTranslations, unrankedData } from '../mocks/ranks-colors'
import useTrackerUrl from "../hooks/useTrackerUrl"
import './styles/Account.css'
import Loading from "./Loding"

function Account({ name, deleteAccount, index }) {

    const trackerUrl = useTrackerUrl(name)

    const [account, setAccount] = useState({})
    const [mmr, setMmr] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isUnranked, setIsUnranked] = useState(false)
    const [isCopied, setIsCopied] = useState(false)


    const firstSection = useRef(null)
    const progress = useRef(null)
    const rankTitle = useRef(null)
    const closeButton = useRef(null)
    const rankImage = useRef(null)
    const closeUndefined = useRef(null)

    useEffect(() => {
        const start = async () => {
            const _account = await new ValorantAPI(name).account()
            // if (_account === undefined) closeUndefined.current.click()
            if (_account === undefined) return
            setAccount(_account)
            const _mmr = await new ValorantAPI(name).mmr()
            if (_mmr === undefined) return
            if (_mmr.elo === null) setIsUnranked(true)
            setMmr(_mmr)
            setIsLoading(false)
        }
        start()
    }, [name])

    const handlePasteName = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(`${account?.name}#${account?.tag}`)
    }

    useEffect(() => {
        if (isLoading) return
        firstSection.current.style.backgroundImage = `url(${account?.card.wide})`
        rankTitle.current.style.color = isUnranked ? unrankedData.color : tierColors[mmr?.currenttierpatched]
        progress.current.style.width = isUnranked ? `${unrankedData.rank_points}%` : `${mmr?.ranking_in_tier}%`
    }, [isLoading])

    return (
        <article>
            <button onClick={deleteAccount} className="hidden" ref={closeUndefined}></button>
            <svg ref={closeButton} onClick={deleteAccount} xmlns="http://www.w3.org/2000/svg" className="close-account icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>
            {
                isLoading ? <Loading /> :
                    <>

                        <div>
                            {isUnranked ?
                                <>
                                    <img ref={rankImage} src={'unranked.png'} className="rank-image" draggable={false} />
                                </>
                                :
                                <>
                                    <img ref={rankImage} src={mmr?.images?.large} className="rank-image" draggable={false} />
                                    {
                                        mmr?.mmr_change_to_last_game > 0 ?
                                        <div className="last-mmr" ><span className="mmr-green">+{mmr?.mmr_change_to_last_game}</span></div>
                                        : mmr?.mmr_change_to_last_game < 0 ?
                                        <div className="last-mmr" ><span className="mmr-red">-{Math.abs(mmr?.mmr_change_to_last_game)}</span></div>
                                        : <div className="last-mmr" ><span className="mmr-cero">+{mmr?.mmr_change_to_last_game}</span></div>
                                    }
                                    <div className="lastgame-text">Last Match</div>
                                </>}
                        </div>
                        <div className="inner-container">
                            <div className="name-container">
                                <h3><a target="_blank" href={trackerUrl} draggable={false}>
                                    {account?.name}<span className="nametag">#{account?.tag}</span></a>
                                </h3>
                                {
                                    !isCopied ?
                                    <svg onClick={handlePasteName} className="copy-account-name icon icon-tabler icon-tabler-copy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                                    </svg> :
                                    <svg onClick={handlePasteName} className="account-copied copy-account-name icon icon-tabler icon-tabler-clipboard-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                                        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                                        <path d="M9 14l2 2l4 -4"></path>
                                    </svg>
                                }
                            </div>
                            <section className="first-section" ref={firstSection}>
                                <div className="rank-title" ref={rankTitle}>{isUnranked ? unrankedData.rank : tierTranslations[mmr?.currenttierpatched]}</div>
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
                    </>
            }
        </article>
    )
}

export default Account
