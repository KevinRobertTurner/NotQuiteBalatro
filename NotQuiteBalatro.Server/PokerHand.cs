
namespace NotQuiteBalatro.Server
{
    public class PokerHand
    {
        public List<PokerCard> Hand { get; set; }

        public PokerHand(List<PokerCard> initialHand)
        {
            Hand = initialHand;
        }
    }
}
