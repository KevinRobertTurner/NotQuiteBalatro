namespace NotQuiteBalatro.Server
{
    public class PokerCard
    {
        public enum CardSuit
        {
            Clubs,
            Diamonds,
            Hearts,
            Spades
        }

        public enum CardValue
        { 
            Two,
            Three,
            Four,
            Five,
            Six,
            Seven,
            Eight,
            Nine,
            Ten,
            Jack,
            Queen,
            King,
            Ace
        }

        public CardSuit Suit { get; set; }

        public CardValue Value { get; set; }

        public PokerCard(CardSuit cs, CardValue cv)
        {
            Suit = cs;
            Value = cv;
        }
    }
}
