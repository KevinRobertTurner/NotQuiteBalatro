import { useState } from 'react';
import './App.css';
import { type ScoringHand, compareHands, getScoringHand, suitToString } from './PokerLogic'
import Card from './Card'

function App() {
    const [pokerHands, setPokerHands] = useState<ScoringHand[]>();
    const [firstPlayer, setFirstPlayer] = useState<string>();
    const [secondPlayer, setSecondPlayer] = useState<string>();

    const gameContents = pokerHands === undefined
        ? <p><em>Press the Draw New Hands button to play a round!</em></p>
        : <>
            {pokerHands.map((hand, index) =>
                <div key={index}>
                    <p className="score">{`${index === 0 ? firstPlayer ?? '' : secondPlayer ?? ''} - ${hand.handType}`}</p>
                    {hand.hand.map(({ suit, value}) => <Card key={suitToString(suit) + value} suit={suit} value={value} />)}
                </div>    
            )}
        </>

    const winner = pokerHands && compareHands(pokerHands[0], pokerHands[1])

    return (
        <div>
            <h1 id="tableLabel">Poker Hands</h1>
            <div>First Player: <input type="text" id="player1" onBlur={(event) => setFirstPlayer(event.target.value) }></input></div>
            <div>Second Player: <input type="text" id="player1" onBlur={(event) => setSecondPlayer(event.target.value)}></input></div>
            <br></br>
            <div><button onClick={() => drawPokerHands()}>Draw New Hands</button></div>
            {gameContents}
            {pokerHands !== undefined && (
                <>
                    {winner === undefined && <p className="result">It's a tie!</p>}
                    {<p className="result">{winner === pokerHands[0] ? firstPlayer : secondPlayer} is the victor!</p>}
                </>
            )}
        </div>
    );

    async function drawPokerHands() {
        const response = await fetch('pokerhands');
        if (response.ok) {
            const data = await response.json();
            setPokerHands(data.map((hand) => getScoringHand(hand.hand)));
        }
    }
}

export default App;