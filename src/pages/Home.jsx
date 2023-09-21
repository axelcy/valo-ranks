import Account from "../components/Account"
import './styles/Home.css'

function Home() {
  return (
    <main>
      <h1 className="main-title no-select">Chinchu-Ranks</h1>
      <section className="account-list no-select">
        <Account name={'CLG Manzana Roja#vsc'} />
        <Account name={'Fake Love#9977'} />
        <Account name={'CLG TeiToTeo84#1815'} />
        <Account name={'CLG Santik2010#TRUJO'} />
        <Account name={'LAC Domix#640'} />
      </section>
    </main>
  )
}

export default Home
