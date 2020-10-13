import React,{useState, useEffect, Fragment} from 'react';
import Axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {

const [coins, setCoins] = useState([])
const [search, setSearch] = useState('')

useEffect(() => {
  Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(res =>{
          setCoins(res.data)
          console.log(res.data);
        })
        .catch(e =>console.log(e))
}, [])

const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins  = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLowerCase())
})

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input 
              className='coin-input'
              type='text'
              placeholder='Search...'
              onChange={handleChange}
          />
        </form>
      </div>
      <Fragment>
          <div className='coin-container'>
            <div className='coin-row'>
            <div className='coin'>
                <h1>Name</h1>
                <p className='coin-symbol'>Symbol</p>
            <p className='coin-symbol'></p>
            </div>
                <div className='coin-data'>
                   <p className='coin-price'>Price</p>
                   <p className='coin-volume'></p>
                        <p className='coin-percent'>Price Change</p>
                        <p className='coin-marketcap'> 
                        Mkt Cap
                        </p>
                </div>
            </div>
        </div>
        </Fragment>
      {filteredCoins.map(coin => {
        return (
          <Coin 
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
          />
        )
      })}
    </div>
  );
}

export default App;
