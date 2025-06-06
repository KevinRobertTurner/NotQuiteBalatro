using Microsoft.AspNetCore.Mvc;

namespace NotQuiteBalatro.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokerHandsController : ControllerBase
    {
        private List<PokerCard> Deck = new();
        private readonly ILogger<PokerHandsController> _logger;

        public PokerHandsController(ILogger<PokerHandsController> logger)
        {
            _logger = logger;

            foreach (PokerCard.CardSuit Suit in Enum.GetValues(typeof(PokerCard.CardSuit)))
            {
                foreach (PokerCard.CardValue Value in Enum.GetValues(typeof(PokerCard.CardValue)))
                {
                    Deck.Add(new PokerCard(Suit, Value));
                }
            }
        }

        [HttpGet(Name = "GetPokerHands")]
        public IEnumerable<PokerHand> Get(int handCount = 2)
        {
            List<PokerCard> FreshDeck = [.. Deck];
            Random rnd = new Random();
            int handSize = 5;

            //Shuffle the deck
            for (int i = FreshDeck.Count - 1; i > 0; i--)
            {
                int k = rnd.Next(i + 1);
                PokerCard card = FreshDeck[k];
                FreshDeck[k] = FreshDeck[i];
                FreshDeck[i] = card;
            }

            return Enumerable.Range(1, handCount).Select(index => new PokerHand(FreshDeck.GetRange((index-1) * handSize, handSize).ToList())).ToArray();
        }
    }
}
