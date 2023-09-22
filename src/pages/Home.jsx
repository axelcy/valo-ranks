import { useState } from "react"
import Account from "../components/Account"
import './styles/Home.css'
import defaultAccounts from "../mocks/accounts"

function Home() {
    const APP_VERSION = '1.33'
    const [accounts, setAccountsState] = useState(JSON.parse(localStorage.getItem('accounts')) || [])

    const setAccounts = newAccounts => {
        setAccountsState(newAccounts)
        localStorage.setItem('accounts', JSON.stringify(newAccounts))
    }

    const deleteAccount = (index) => setAccounts([...accounts].filter((_, i) => i !== index))

    const resetAccounts = () => setAccounts([])

    const setChinchulines = () => setAccounts(defaultAccounts)

    const handleSubmit = (e) => {
        e.preventDefault()
        setAccounts([...accounts, e.target.account.value])
        e.target.account.value = ''
    }

    return (
        <main>
            <header>
                <button onClick={resetAccounts}>Borrar todas las cuentas</button>
                <button onClick={setChinchulines}>Poner a los chinchulines</button>
            </header>
            <div className="title-container">
                <h1 className="main-title no-select">Chinchu Ranks</h1><h3 className="nametag">v{APP_VERSION}</h3>
            </div>
            <form className="flex justify-center pb-10" onSubmit={handleSubmit}>
                <input autoComplete="off" className="search-bar no-select w-1/3 rounded-full px-5 py-3" name="account" type="text" placeholder="CLG Manzana Roja#vsc" />
            </form>
            <section className="account-list no-select">
                {accounts?.map((account, index) => (
                    <Account key={index} index={index} name={account} deleteAccount={() => deleteAccount(index, account)} />
                ))}
            </section>
        </main>
    )
}

export default Home
