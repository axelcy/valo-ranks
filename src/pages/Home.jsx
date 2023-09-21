import { useState } from "react"
import Account from "../components/Account"
import './styles/Home.css'
import defaultAccounts from "../mocks/accounts"

function Home() {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem('accounts')) || [])
    // const [accounts, setAccounts] = useState(defaultAccounts)
    const handleSubmit = (e) => {
        e.preventDefault()
        setAccounts([...accounts, e.target.account.value])
        e.target.account.value = ''
        localStorage.setItem('accounts', JSON.stringify([...accounts, e.target.account.value]))
    }

    const deleteAccount = (index, name) => {
        setAccounts([...accounts].filter((_, i) => i !== index))
        // if (name) alert(`No se encontró la cuenta ${name} `)
        localStorage.setItem('accounts', JSON.stringify([...accounts].filter((_, i) => i !== index)))
    }
    const resetAccounts = () => {
        setAccounts([])
        localStorage.clear()
    }
    const setChinchulines = () => {
        setAccounts(defaultAccounts)
        localStorage.setItem('accounts', JSON.stringify(defaultAccounts))
    }
    return (
        <main>
            <button onClick={resetAccounts}>Borrar todas las cuentas</button>
            <button onClick={setChinchulines}>Poner a los chinchulines</button>
            <h1 className="main-title no-select">Chinchu-Ranks v1.3</h1>
            <form className="flex justify-center" onSubmit={handleSubmit}>
                <input autoComplete="false" className="search-bar no-select w-1/3 rounded-full px-5 py-3" name="account" type="text" placeholder="CLG Manzana Roja#vsc" />
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
