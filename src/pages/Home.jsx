import { useState } from "react"
import Account from "../components/Account"
import './styles/Home.css'
import defaultAccounts from "../mocks/accounts"

function Home() {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem('accounts')) || [])
    const handleSubmit = (e) => {
        e.preventDefault()
        // verificar que exista antes de agregar
        setAccounts([...accounts, e.target.account.value])
        e.target.account.value = ''
        localStorage.setItem('accounts', JSON.stringify([...accounts, e.target.account.value]))
    }

    const handleDelete = (index) => setAccounts([...accounts].filter((_, i) => i !== index))
    return (
        <main>
            <h1 className="main-title no-select">Chinchu-Ranks v1.1</h1>
            <form className="flex justify-center" onSubmit={handleSubmit}>
                <input className="search-bar no-select w-1/3 rounded-full px-5 py-3" name="account" type="text" placeholder="CLG Manzana Roja#vsc" />
            </form>
            <section className="account-list no-select">
                {accounts?.map((account, index) => (
                    <Account key={index} name={account} handleDelete={() => handleDelete(index)} />
                ))}
            </section>
        </main>
    )
}

export default Home
