import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [roomid, setRoomid] = useState("");
    const navigate = useNavigate();

    const handleCreate = () => {
        if (roomid) navigate(`/room/${roomid}`);
    };

    const normalizeInput = (value) => {
        return value
            .toLowerCase()
            .replace(/\s|_/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9-]/g, "");
    };

    return (
        <div className="page home">
            <h1 className="home_logo">Quiz Room</h1>
            <form
                className="home_form iform"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                }}
            >
                <input
                    value={roomid}
                    onChange={(e) => setRoomid(normalizeInput(e.target.value))}
                    placeholder="room id"
                    maxLength="15"
                />
                <button type="submit" disabled={!roomid}>
                    &gt;
                </button>
            </form>
        </div>
    );
}

export default Home;
