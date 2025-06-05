import { useState, useEffect } from "react";
import "../styles/Container.css";
import "../styles/ContainerScreen.css";

const Container = () => {
    const twelveCards = [
        {
            id: crypto.randomUUID(),
            index: 1,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 2,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 3,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 4,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 5,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 6,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 7,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 8,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 9,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 10,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 11,
            clicked: false,
            source: null,
            title: "",
        },
        {
            id: crypto.randomUUID(),
            index: 12,
            clicked: false,
            source: null,
            title: "",
        },
    ];

    const [cardOrder, setCardOrder] = useState(twelveCards);
    const [gifs, setGifs] = useState([]);
    const [update, setUpdate] = useState(false);
    const query = "sport";
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const updateTwelveCards = (defaultCards, generatedGifs) => {
        const refGifs = [...generatedGifs];

        for (let i = 0; i < defaultCards.length; i++) {
            defaultCards[i]["source"] = refGifs[i].images.fixed_height.url;
            defaultCards[i]["title"] = refGifs[i].title;
        }
        setCardOrder(defaultCards);
    };

    useEffect(() => {
        const API_KEY = "9S5QHsYT4BVlJ6rNDL6EFpUSW9ApBXuG";
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setGifs(data.data);
            })
            .catch((err) => console.error("Giphy fetch error", err));
    }, [query]);

    if ((gifs.length === 12) & !update) {
        updateTwelveCards(twelveCards, gifs);
        setUpdate(true);
    }

    function shuffleArray(arr) {
        let currentIndex = arr.length,
            randomIndex;

        // While there remain elements to shuffle
        while (currentIndex !== 0) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap it with the current element
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex],
                arr[currentIndex],
            ];
        }
        return arr;
    }

    const handleGameOver = () => {
        setGameOver(true); // Step 1: show "Game Over" state

        // Step 2: use timeout to delay reset
        setTimeout(() => {
            // Step 3: reset game state
            setGameOver(false);
            setScore(0);
            if (score > bestScore) {
                setBestScore(score);
            }
            
            updateTwelveCards(twelveCards, gifs);
            shuffleArray(twelveCards);
            setCardOrder(twelveCards);
        }, 3000);
    };

    const handleCardClicked = (ref_id) => {
        let newCardOrder = [...cardOrder];
        let indexOfRefId;
        for (let i = 0; i < newCardOrder.length; i++) {
            if (newCardOrder[i].id === ref_id) {
                indexOfRefId = i;
            }
        }

        if (indexOfRefId < 0 || indexOfRefId >= newCardOrder.length) return;

        if (newCardOrder[indexOfRefId].clicked === false) {
            setScore((prev) => prev + 1);
            newCardOrder[indexOfRefId].clicked = true;
            shuffleArray(newCardOrder);
            setCardOrder(newCardOrder);
        } else {
            handleGameOver();
           
        }
    };


    return (
            <div id="container">
                <Header currentScore={score} bestScore={bestScore} />
                <div className="cardParent">
                    <Cards
                        AllCards={cardOrder}
                        handleCardClicked={handleCardClicked}
                        gameOver={gameOver}
                    />
                </div>
            </div>
        );

    
};

const Cards = ({ AllCards, handleCardClicked, gameOver }) => {
    return (
        <div className="allCards">
            {AllCards.map((this_card) => {
                return (
                    <div
                        key={this_card.id}
                        className={`simpleCard ${gameOver && !this_card.clicked ? "unclicked" : "" }`}
                        onClick={() => handleCardClicked(this_card.id)}
                        disabled={gameOver}
                    >
                        <img
                            key={this_card.id}
                            src={this_card.source}
                            alt={this_card.title}
                        />
                        <div className="cardTitle">{this_card.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

const Header = ({ currentScore, bestScore }) => {
    return (
        <div className="projectHeader">
            <div className="infoSection">
                <div>Test your Memory.</div>
                <div>Click On Each Card Only Once.</div>
            </div>
            <div className="scoreSection">
                <span>Score: {currentScore}</span>
                <span>Best Score: {bestScore} </span>
            </div>
        </div>
    );
};



export default Container;
