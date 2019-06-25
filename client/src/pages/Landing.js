import React, { useState } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENCY_PAIR_INFO = gql`
  query CurrencyPairInfo($fc: String, $tc: String) {
    currencyPairInfo(tc: $tc, fc: $fc) {
      fromCurrency 
      fromCurrencyName
      toCurrency
      toCurrencyName
      exchangeRate
      lastRefreshed
      timeZone
      bidPrice
      askPrice
    }
  }
`

const Landing = props => {
    const [currency, setCurrency] = useState('EUR'),
          [toCurrency, setToCurrency] = useState('USD')

    return (
        <Query query={CURRENCY_PAIR_INFO} variables={{ fc: currency, tc: toCurrency }}>
            {({ data, loading, error }) => {
                if(loading) return <h1 style={{marginTop: 100}}>Loading...</h1>
                if(error) return `Error ${error}`
                return (
                    <main style={{marginTop: 100}}>
                        {
                            data && data.currencyPairInfo && Object.keys(data.currencyPairInfo).map(val =>(
                                <main key={Math.random()}>
                                    <div>{val && `${val}:`}</div>
                                    <div>{data.currencyPairInfo[val] && `${data.currencyPairInfo[val]}`}</div>
                                </main>
                            ))
                        }
                    </main>
                )
                
            }}
        </Query>
    )
}

export default Landing 