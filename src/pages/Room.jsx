import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, update, onValue, get, set } from "firebase/database";
import { SettingsContext } from "../contexts/SettingsContext";

function Room() {
    const settings = useContext(SettingsContext);
    const { roomid } = useParams();
    const [init, setInit] = useState(false);
    const [creator, setCreator] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [players, setPlayers] = useState({});
    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );
    const [answer, setAnswer] = useState("");
    const [revealed, setRevealed] = useState(false);
    const roomRef = ref(db, `rooms/${roomid}`);
    const haveAnswered = !!answers.find((a) => a.userid === settings.userID);
    const isLocked = haveAnswered || !username || !init;
    const isCreator = creator === settings.userID;

    useEffect(() => {
        if (!settings.userID) return;
        const initializeRoom = async () => {
            const snapshot = await get(ref(db, `rooms/${roomid}`));
            if (!snapshot.exists()) {
                await set(ref(db, `rooms/${roomid}`), {
                    answers: {},
                    players: {
                        [settings.userID]: {
                            userid: settings.userID,
                            username: username,
                        },
                    },
                    creator: settings.userID,
                    revealed: false,
                });
                setInit(true);
            } else {
                setInit(true);
            }
        };
        initializeRoom();

        onValue(ref(db, `rooms/${roomid}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sortedAnswers = Object.values(data.answers || {}).sort(
                    (a, b) => a.timestamp - b.timestamp
                );
                setAnswers(sortedAnswers);
                setPlayers(data.players || {});
                setRevealed(data.revealed);
                setCreator(data.creator);
            }
        });
    }, [roomid, settings.userID, username]);

    useEffect(() => {
        if (!settings.userID || !init) return;
        localStorage.setItem("username", username);
        update(ref(db, `rooms/${roomid}/players/${settings.userID}`), {
            userid: settings.userID,
            username: username,
        });
    }, [username, settings.userID, init]);

    const handleAnswerSubmit = (submittedAnswer = answer) => {
        if (init && submittedAnswer) {
            update(ref(db, `rooms/${roomid}/answers/${settings.userID}`), {
                answer: submittedAnswer,
                userid: settings.userID,
                timestamp: Date.now(),
            });
            setAnswer("");
        }
    };

    const handleAnswerLetterSubmit = (letter) => {
        handleAnswerSubmit(letter);
    };

    const handleRevealAnswers = () => {
        if (init) {
            update(roomRef, {
                revealed: !revealed,
            });
        }
    };

    const handleResetAnswers = () => {
        if (init) {
            update(roomRef, {
                revealed: false,
                answers: {},
            });
        }
    };

    async function handleShare() {
        try {
            await navigator.share({
                title: "Quiz Room",
                text: "Invit friends",
                url: `https://quiz-room-df696.web.app/room/${roomid}`,
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="page game">
            <div className="page_shrink game_title">{roomid}</div>
            <div className="page_shrink iform game_username">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    disabled={haveAnswered}
                    maxLength="10"
                />
            </div>
            <div className="page_expand game_content">
                {answers.map((a, idx) => (
                    <div className="game_message" key={idx}>
                        <span className="game_u">
                            {players[a.userid]?.username || "No name"}
                        </span>
                        <span className="game_txt">
                            {revealed ? a.answer : "…"}
                        </span>
                    </div>
                ))}
            </div>
            {/* {Object.values(players || {})
                .filter((u) => !answers.find((a) => a.userid === u.userid))
                .map((u, idx) => (
                    <p key={idx}>{u.username}</p>
                ))} */}

            {username && (
                <>
                    <div className="page_shrink iform game_letters">
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("A")}
                            disabled={isLocked}
                        >
                            A
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("B")}
                            disabled={isLocked}
                        >
                            B
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("C")}
                            disabled={isLocked}
                        >
                            C
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("D")}
                            disabled={isLocked}
                        >
                            D
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("E")}
                            disabled={isLocked}
                        >
                            E
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswerLetterSubmit("F")}
                            disabled={isLocked}
                        >
                            F
                        </button>
                    </div>
                    <form
                        className="page_shrink iform game_answer"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAnswerSubmit();
                        }}
                    >
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Answer"
                            disabled={isLocked}
                        />
                        <button type="submit" disabled={isLocked || !answer}>
                            &gt;
                        </button>
                    </form>
                </>
            )}

            {isCreator && (
                <div className="page_shrink iform iform-expand game_actions">
                    <button type="button" onClick={handleShare}>
                        Share
                    </button>
                    <button onClick={handleRevealAnswers}>
                        {revealed ? "Hide answers" : "Show answers"}
                    </button>
                    <button onClick={handleResetAnswers}>Reset</button>
                </div>
            )}
        </div>
    );
}

export default Room;
