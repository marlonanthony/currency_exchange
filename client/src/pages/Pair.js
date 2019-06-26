import React from 'react'

const Pair = (props) => {
    console.log(props) 
    if(props.location.state) {
        const {createdAt, id, lotSize, openedAt, pair, position } = props.location.state.pair
        return props.location.state && (
            <div>
                <p><span>Currency Pair: </span>{pair}</p>
                <p><span>Lot Size: </span>{lotSize}</p>
                <p><span>Opened At: </span>{openedAt}</p>
                <p><span>Position: </span>{position}</p>
                <p><span>Created At: </span>{createdAt}</p>
                {/* { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt }</p> }
                { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt }</p> }
                { pair.pipDif && <p><span>Pip Dif: </span>{ pair.pipDif }</p> }
                { pair.profitLoss && <p><span>Profit/Loss: </span>{ pair.profitLoss }</p> }
                { pair.open ? <p><span>Open: </span>true</p> : <p><span>Open: </span>false</p> }
                { pair.createdAt && <p><span>Created At: </span>{ pair.createdAt }</p> } */}
            </div>
        )
    }
}

export default Pair 
