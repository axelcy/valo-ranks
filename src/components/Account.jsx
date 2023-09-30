import { useEffect, useRef, useState } from "react"
import ValorantAPI from "../modules/api/ValorantAPI"
import { tierColors, tierTranslations, unrankedData } from '../mocks/ranks-colors'
import useTrackerUrl from "../hooks/useTrackerUrl"
import './styles/Account.css'
import { CloseAccount, CopyName, NameCopied } from "../assets/Icons"
import Loader from "../assets/Loader"

function Account({ name, closeAccount, index }) {

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
        navigator.clipboard.writeText(name) // `${account?.name}#${account?.tag}`
    }

    useEffect(() => {
        if (isLoading) return
        firstSection.current.style.backgroundImage = `url(${account?.card.wide})`
        rankTitle.current.style.color = isUnranked ? unrankedData.color : tierColors[mmr?.currenttierpatched]
        progress.current.style.width = isUnranked ? `${unrankedData.rank_points}%` : `${mmr?.ranking_in_tier}%`
    }, [isLoading])

    return (
        <article>
            <button onClick={closeAccount} className="hidden" ref={closeUndefined}></button>
            <CloseAccount ref={closeButton} onClick={closeAccount} />
            {
                isLoading ? 
                <div className="article-loading">
                    <div><Loader /></div>
                    <div className="name-container">
                        <h3 className="name-loading">
                            {name.split('#')[0]}<span className="nametag">#{name.split('#')[1]}</span>
                        </h3>
                        {
                            !isCopied ?
                            <CopyName onClick={handlePasteName} /> :
                            <NameCopied onClick={handlePasteName} />
                        }
                    </div>
                </div> :
                <>
                    {
                        isUnranked ?
                        <img ref={rankImage} src={'unranked.png'} className="rank-image" draggable={false} />
                        :
                        <aside>
                            <img ref={rankImage} src={mmr?.images?.large} className="rank-image" draggable={false} />
                            {
                                mmr?.mmr_change_to_last_game > 0 ? // Ganó
                                <div className="last-mmr"><span className="mmr-green">+{mmr?.mmr_change_to_last_game}</span></div>
                                : mmr?.mmr_change_to_last_game < 0 ? // Perdió
                                <div className="last-mmr"><span className="mmr-red">-{Math.abs(mmr?.mmr_change_to_last_game)}</span></div>
                                : // Empató
                                <div className="last-mmr"><span className="mmr-cero">+{mmr?.mmr_change_to_last_game}</span></div>
                            }
                           <span className="lastgame-text">Last Match</span>
                        </aside>
                    }
                    <div className="inner-container">
                        <header className="name-container">
                            <h3><a target="_blank" href={trackerUrl} draggable={false}>
                                {account?.name}<span className="nametag">#{account?.tag}</span></a>
                            </h3>
                            {
                                !isCopied ?
                                <CopyName onClick={handlePasteName} /> :
                                <NameCopied onClick={handlePasteName} />
                            }
                        </header>
                        <div className="account-card" ref={firstSection}>
                            <div className="rank-title" ref={rankTitle}>
                                {isUnranked ? unrankedData.rank : tierTranslations[mmr?.currenttierpatched]}
                            </div>
                        </div>
                        <footer className="account-footer">
                            <div className="progress-container">
                                <div className="rank-progress-bar">
                                    <div ref={progress} className="rank-progress"></div>
                                </div>
                            </div>
                            <div className="rank-rating-container">
                                <p className="rank-rating-text">RANK RATING</p>
                                <p className="rank-rating"><span className="actual-rating">{mmr?.ranking_in_tier ?? '0'}</span> / 100</p>
                            </div>
                        </footer>
                    </div>
                </>
            }
        </article>
    )
}

export default Account
