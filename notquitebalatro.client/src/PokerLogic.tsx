export interface PokerCard {
    suit: number;
    value: number;
}

export interface ScoringHand {
    hand: PokerCard[];
    handType: string;
}

export function suitToString(suit: number): string {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

    return suits[suit]
}

function sortHand(hand: PokerCard[]): PokerCard[] {
    const sortedHand = [...hand]

    // Sorting High to Low
    return sortedHand.sort((cardA, cardB) => cardB.value - cardA.value)
}

function countRepeats(hand: PokerCard[]): number[] {
    const values = hand.map(({ value }) => value);
    const countedValues = values.reduce((acc: any, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    const counts: number[] = Object.values(countedValues)

    // Because properties are sorted low to high, we need to reverse the array
    return counts.reverse()
}

function handIsStraight(hand: PokerCard[]): boolean {
    const values = hand.map(({ value }) => value);

    // If the first values are an ace and a 5, skip the first check to account for low aces.
    for (let i = values[0] === 13 && values[1] === 5 ? 2 : 1; i < values.length; i++) {
        if (values[i] !== values[i - 1] - 1) {
            return false;
        }
    }

    return true
}

function handIsFlush(hand: PokerCard[]): boolean {
    const uniqueSuits = new Set(hand.map(({ suit }) => suit))

    return uniqueSuits.size === 1
}

export function getScoringHand(hand: PokerCard[]): ScoringHand {
    let handType = 'High Card'
    let sortedHand: PokerCard[] = sortHand(hand);
    const counts: number[] = countRepeats(sortedHand)

    if (handIsStraight(sortedHand) && handIsFlush(sortedHand)) {
        handType = 'Straight Flush'
    }
    if (counts.includes(4)) {
        handType = 'Four of a Kind'
    }
    if (counts.includes(3) && counts.includes(2)) {
        handType = 'Full House'

        // Resort the triplet to the top for comparison purposes
        if (sortedHand[0].value !== sortedHand[2].value) {
            sortedHand = sortedHand.reverse()
        }
    }
    if (handIsFlush(sortedHand)) {
        handType = 'Flush'
    }
    if (handIsStraight(sortedHand)) {
        handType = 'Straight'

        // Move low aces to the end of the straight for comparison purposes
        if (sortedHand[0].value === 13 && sortedHand[1].value === 5) {
            sortedHand.push(sortedHand.shift()!)
        }
    }
    if (counts.includes(3)) {
        handType = 'Three of a Kind'

        // find the kickers and move them to the end for comparison purposes
        if (counts[0] === 1) {
            if (counts[2] === 1) {
                const lowKicker: PokerCard = sortedHand.pop()!
                sortedHand.push(sortedHand.shift()!, lowKicker)
            } else {
                sortedHand = sortedHand.reverse()
            }
        }
    }
    if (counts.length === 3 && !counts.includes(3)) {
        handType = 'Two Pair'

        // find the kicker and move it to the end for comparison purposes
        if (counts[0] === 1) {
            sortedHand.push(sortedHand.shift()!)
        } else if (counts[1] === 1) {
            sortedHand.push(sortedHand.splice(2, 1)[0])
        }
    }
    if (counts.length === 4) {
        handType = 'Pair'

        // find the kickers and move them to the end for comparison purposes
        if (counts[0] !== 2) {
            const pairIndex = counts.lastIndexOf(2)

            sortedHand.unshift(...sortedHand.splice(pairIndex, 2))
        }
    }

    return { hand: sortedHand, handType }
}

export function compareHands(firstHand: ScoringHand, secondHand: ScoringHand): ScoringHand | undefined {
    const typeMappings = ["High Card", "Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush"]
    const { hand: hand1, handType: firstType} = firstHand;
    const { hand: hand2, handType: secondType } = secondHand;


    if (firstType !== secondType) {
        return typeMappings.indexOf(firstType) > typeMappings.indexOf(secondType) ? firstHand : secondHand
    }

    for (let i = 0; i < 5; i++) {
        if (hand1[i].value !== hand2[i].value) {
            return hand1[i].value > hand2[i].value ? firstHand : secondHand
        }
    }
}