import { type PokerCard } from './PokerLogic'

const mappings = [
    [
        "CLUB-2.svg",
        "CLUB-3.svg",
        "CLUB-4.svg",
        "CLUB-5.svg",
        "CLUB-6.svg",
        "CLUB-7.svg",
        "CLUB-8.svg",
        "CLUB-9.svg",
        "CLUB-10.svg",
        "CLUB-11-JACK.svg",
        "CLUB-12-QUEEN.svg",
        "CLUB-13-KING.svg",
        "CLUB-1.svg"
    ],
    [
        "DIAMOND-2.svg",
        "DIAMOND-3.svg",
        "DIAMOND-4.svg",
        "DIAMOND-5.svg",
        "DIAMOND-6.svg",
        "DIAMOND-7.svg",
        "DIAMOND-8.svg",
        "DIAMOND-9.svg",
        "DIAMOND-10.svg",
        "DIAMOND-11-JACK.svg",
        "DIAMOND-12-QUEEN.svg",
        "DIAMOND-13-KING.svg",
        "DIAMOND-1.svg"
    ],
    [
        "HEART-2.svg",
        "HEART-3.svg",
        "HEART-4.svg",
        "HEART-5.svg",
        "HEART-6.svg",
        "HEART-7.svg",
        "HEART-8.svg",
        "HEART-9.svg",
        "HEART-10.svg",
        "HEART-11-JACK.svg",
        "HEART-12-QUEEN.svg",
        "HEART-13-KING.svg",
        "HEART-1.svg"
    ],
    [
        "SPADE-2.svg",
        "SPADE-3.svg",
        "SPADE-4.svg",
        "SPADE-5.svg",
        "SPADE-6.svg",
        "SPADE-7.svg",
        "SPADE-8.svg",
        "SPADE-9.svg",
        "SPADE-10.svg",
        "SPADE-11-JACK.svg",
        "SPADE-12-QUEEN.svg",
        "SPADE-13-KING.svg",
        "SPADE-1.svg"
    ]
]

function Card({ suit, value}: PokerCard) {
    return <span><img src={`/cards/${mappings[suit][value]}`} /></span>
}

export default Card