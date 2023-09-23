import { useEffect, useRef, useState } from "react"
import ValorantAPI from "../modules/api/ValorantAPI"
import { tierColors, tierTranslations } from '../mocks/ranks-colors'
import useTrackerUrl from "../hooks/useTrackerUrl"
import './styles/Account.css'
import Loading from "./Loding"

function Account({ name, deleteAccount, index }) {
    const [account, setAccount] = useState({})
    const [mmr, setMmr] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const trackerUrl = useTrackerUrl(name)
    const firstSection = useRef(null)
    const progress = useRef(null)
    const rankTitle = useRef(null)
    const closeButton = useRef(null)
    const rankImage = useRef(null)
    
    useEffect(() => {
        const start = async () => {
            // saqué el try catch y el response.ok en el useFetch
            try {
                const _account = await new ValorantAPI(name).account()
                // if (_account?.status === 404 || _account === undefined) return
                setAccount(_account)
                // Funciona para latam y br
                const _mmr = await new ValorantAPI(name).mmr()
                setMmr(_mmr)
                setIsLoading(false)
            }
            catch (err) {

            }
        }
        start()
    }, [name])

    const resizeEvent = () => {
        if (window.innerWidth > 600) { // PANTALLA GRANDE
            firstSection.current.style.minWidth = '353px'
            rankImage.current.style.height = '5rem'
        } else { // PANTALLA CHICA
            firstSection.current.style.minWidth = '250px'
            rankImage.current.style.height = ''
        }
    }
    window.addEventListener('resize', resizeEvent)

    useEffect(() => {
        if (isLoading) return
        resizeEvent()
        firstSection.current.style.backgroundImage = `url(${account?.card.wide})`
        rankTitle.current.style.color = tierColors[mmr?.currenttierpatched]  
        progress.current.style.width = `${mmr?.ranking_in_tier}%`
    }, [isLoading])

    return (
        <article>
            {
                isLoading ? <Loading /> :
                <>
                    <svg ref={closeButton} onClick={deleteAccount} xmlns="http://www.w3.org/2000/svg" className="close-account icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M18 6l-12 12"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                    <div>
                        <img ref={rankImage} src={mmr?.images?.large} className="rank-image" draggable={false} />
                        {
                            mmr?.mmr_change_to_last_game > 0 ?
                                <div className="last-mmr" ><span className="mmr-green">+{mmr?.mmr_change_to_last_game}</span></div> : // hacer modulo
                                <div className="last-mmr" ><span className="mmr-red">-{Math.abs(mmr?.mmr_change_to_last_game)}</span></div>
                        }
                        <div className="lastgame-text">Last Match</div>
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
                </>
            }
        </article>
    )
}

export default Account
