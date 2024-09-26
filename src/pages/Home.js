
import { useState, useEffect, useRef }                  from "react"
import Domino                                           from "../components/Domino"
import { allDominos }                                   from "../utils/DominoData"
import play                                             from "../assets/play.png"   
import wrongSound                                       from "../assets/wrong-sound.wav"
import successSound                                     from "../assets/validate-sound.wav"
import newCardSound                                     from "../assets/jump-sound.wav"

// Fonction pour mélanger un tableau
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
}

function Home() {
    const [randomDomino, setRandomDomino]               = useState(null)
    const [message, setMessage]                         = useState('')
    const [dominosInPlay, setDominosInPlay]             = useState(allDominos)
    const [playButtonVisible, setPlayButtonVisible]     = useState(true)
    const [buttonsVisible, setButtonsVisible]           = useState(Array(5).fill(true)) 
    const [gameStatus, setGameStatus]                   = useState('')
    const [selectedDominoId, setSelectedDominoId]       = useState(null)
    const [matchedDominoId, setMatchedDominoId]         = useState(null)
    const [animatingDominoId, setAnimatingDominoId]     = useState(null)

    const wrongSoundRef                                 = useRef(null)
    const succesSoundRef                                = useRef(null)
    const newCardSoundRef                               = useRef(null)

    // Mélanger et sélectionner 10 dominos lors du chargement de la page
    useEffect(() => {
        const shuffledDominos = shuffleArray(allDominos).slice(0, 10);
        setDominosInPlay(shuffledDominos);
    }, []);

    // Fonction pour démarrer le jeu
    const handlePlayButtonClick = () => {
        generateRandomDomino()
        setPlayButtonVisible(false)
    }
  
    // Génère un domino aléatoire
    const generateRandomDomino = () => {
        const randomIndex = Math.floor(Math.random() * allDominos.length)
        const selectedDomino = allDominos[randomIndex]

        setRandomDomino(selectedDomino)
        setMessage('')
        setSelectedDominoId(null)
        setMatchedDominoId(null)
        setAnimatingDominoId(null)
    }

    const checkMatch = (domino) => {
        if (randomDomino) {
            const isLeftMatch = domino.left === randomDomino.left || domino.left === randomDomino.right;
            const isRightMatch = domino.right === randomDomino.left || domino.right === randomDomino.right;

            if (isLeftMatch || isRightMatch) {
                setMessage('Bravo! C’est le bon domino!')
                setMatchedDominoId(domino.id)
                setAnimatingDominoId(domino.id)

                succesSoundRef.current.play()

                setTimeout(() => {
                    setDominosInPlay((prev) => prev.filter((d) => d.id !== domino.id)); // Enlever le domino du jeu
                    setAnimatingDominoId(null); // Réinitialiser l'état d'animation après la suppression
                }, 600)

                // Retire le domino correspondant du second plan
                //setDominosInPlay((prev) => prev.filter((d) => d.id !== domino.id))
                
                // Remplace le domino du premier plan par la moitié qui ne correspond pas
                if (isLeftMatch && !isRightMatch) {
                    setRandomDomino({ left: null, right: domino.right })
                } 
                else if (isRightMatch && !isLeftMatch) {
                    setRandomDomino({ left: domino.left, right: null })
                } 
                else {
                    // Si les deux côtés sont identiques, afficher les deux
                    setRandomDomino(domino)
                }

                // Vérifie si tous les dominos du second plan ont été trouvés
                if (dominosInPlay.length === 1) {
                    setGameStatus('Gagné! Tous les dominos ont été trouvés!')
                }

                setSelectedDominoId(null)
            } 
            else {
                setMessage('Dommage, essaye encore!')
                setSelectedDominoId(domino.id)
                wrongSoundRef.current.play()
            }
        }
    }   

    // Fonction pour générer un nouveau domino en cliquant sur un bouton en cercle
    const handleCircleButtonClick = (index) => {
        if (buttonsVisible[index]) {
            // Remplace le domino du premier plan
            generateRandomDomino() 
            newCardSoundRef.current.play()

            // Cache le bouton cliqué
            setButtonsVisible((prev) => {
                const updatedButtonsVisible = prev.map((visible, i) => (i === index ? false : visible))
                checkGameLost(updatedButtonsVisible)
                return updatedButtonsVisible
            })
        }
    }

    // Vérifie si tous les boutons en cercle ont disparu
    const checkGameLost = (updatedButtonsVisible) => {
        if (updatedButtonsVisible.every((visible) => !visible) && dominosInPlay.length > 0) {
            setGameStatus('Perdu! Tous les boutons ont disparu sans trouver tous les dominos!')
        }
    }

    // Appeler la vérification de perte de jeu chaque fois qu'un bouton en cercle est cliqué
    const handleCircleButtonClickWithCheck = (index) => {
        handleCircleButtonClick(index)
    }

    return (
        <div className="home">
            <audio ref={wrongSoundRef} src={wrongSound} preload="auto" />
            <audio ref={succesSoundRef} src={successSound} preload="auto" />
            <audio ref={newCardSoundRef} src={newCardSound} preload="auto" />

            <div className="second-plan">
                {dominosInPlay.map((domino) => ( 
                <Domino key={domino.id} left={domino.left} right={domino.right} onClick={() => {checkMatch(domino); console.log(matchedDominoId === domino.id)}} className={selectedDominoId === domino.id ? 'domino-shake' : matchedDominoId === domino.id ? 'fade-out' : ''} /> ))}
            </div>

            {message && <h3>{message}</h3>}
            {gameStatus && <h3>{gameStatus}</h3>}

            <div className="first-plan">
               
                {playButtonVisible ? (
                    <button onClick={handlePlayButtonClick} className="button-colored play-btn">
                        <img src={play} alt="" />
                    </button>
                ) : (
                    <>
                    {/* Affiche le domino au premier plan */}
                    {randomDomino && <Domino left={randomDomino.left} right={randomDomino.right} />}

                    {/* Affiche les boutons de pioche */}
                    <div className="pioche-btns">
                        {buttonsVisible.map((visible, index) => (
                            visible && (
                                <button key={index} className="pioche-btn" onClick={() => handleCircleButtonClickWithCheck(index)}>
                                    {index + 1}
                                </button>
                            )
                        ))}
                    </div> 
                    </>
                )}
            </div>
        </div>
    )
}

export default Home