import { useState } from "react"
import Account from "../components/Account"
import './styles/Home.css'
import mappedAccounts from "../mocks/accounts"
// import WavesBackground from "../components/WavesBackground"
import { SadFace, TrashCan } from "../assets/Icons"

// const APP_VERSION = '1.6.3'

function Home() {
    const [accounts, setAccountsState] = useState(JSON.parse(localStorage.getItem('accounts')) || [])

    const setAccounts = newAccounts => {
        setAccountsState(newAccounts)
        localStorage.setItem('accounts', JSON.stringify(newAccounts))
    }

    const closeAccount = (index) => setAccounts([...accounts].filter((_, i) => i !== index))

    const resetAccounts = () => setAccounts([])

    const setMappedAccounts = () => setAccounts(mappedAccounts)

    const handleSubmit = (e) => {
        e.preventDefault()
        // e.target.blur()
        setAccounts([...accounts, e.target.account.value])
        e.target.account.value = ''
    }

    return (
        <main>
            <div className="title-container">
                <h1 className="main-title no-select">Chinchu Ranks</h1>
                <h3 className="nametag no-select">v{import.meta.env.VITE_APP_VERION}</h3>
            </div>
            <form className="main-form flex justify-center pb-10 gap-5 items-center" onSubmit={handleSubmit}>
                { accounts.length > 0 && <TrashCan onClick={resetAccounts} content="Eliminar cuentas" /> }
                <input autoComplete="off" className="search-bar no-select w-1/3 rounded-full px-5 py-3" name="account" type="text" placeholder="CLG Manzana Roja#vsc" />
            </form>
            <section className="account-list no-select">
                {
                    accounts.length > 0 ? accounts.map((account, index) => (
                        <Account key={index} index={index} name={account} closeAccount={() => closeAccount(index, account)} />
                    )) :
                    <div className="no-accounts-container">
                        <SadFace />
                        <p className="no-accounts-msg">Parece que no tienes cuentas... Prueba <span onClick={setMappedAccounts}>agregar algunas!</span></p>
                    </div>
                }
            </section>
            {/* <WavesBackground /> */}
        </main>
    )
}

export default Home
