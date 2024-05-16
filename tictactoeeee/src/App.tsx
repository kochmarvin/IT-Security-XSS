import { useEffect, useState } from 'react';

import Field from './Field';
import axios from 'axios';

function App() {
	const [playerName, setPlayerName] = useState('');
	const [joined, setJoined] = useState(false);
	const [start, setStart] = useState(false);
	const [logs, setLogs] = useState<string[]>([]);
	const [canMove, setCanMove] = useState<boolean>(false);
	const [board, setBoard] = useState<(string | null)[]>([]);
	const [winner, setWinnder] = useState<string>('');

	const joinGame = async () => {
		await axios.post('http://localhost:3000/join', {
			name: playerName,
		});
		setJoined(true);
		localStorage.setItem('playerName', playerName);
	};

	const fetchPlayers = async () => {
		const response = await axios.get('http://localhost:3000/players');

		setStart(response.data.length == 2);
	};

	const fetchBoard = async () => {
		const response = await axios.get('http://localhost:3000/board');
		console.log(response.data);
		setBoard(response.data);
	};

	const fetchCurrent = async () => {
		const response = await axios.get('http://localhost:3000/current');

		if (response.data.current == playerName) {
			setCanMove(true);
		}
	};

	const fetchLog = async () => {
		const response = await axios.get('http://localhost:3000/logs');

		setLogs(response.data.logs);
	};

	const fetchWinner = async () => {
		const response = await axios.get('http://localhost:3000/win');

		if (response.data.winner) {
			setWinnder(response.data.winner);
		}
	};

	useEffect(() => {
		setInterval(() => {
			if (!start) {
				fetchPlayers();
			}

			if (start) {
				fetchLog();
				fetchBoard();
				fetchCurrent();
				fetchWinner();
			}
		}, 500);
	}, [start]);

	return (
		<>
			{!joined && (
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white flex flex-col justify-center items-center">
					<div>
						<input
							placeholder="Player Name"
							value={playerName}
							className="border-slate-200 border rounded-lg p-3 w-full"
							onChange={(ev) => setPlayerName(ev.target.value)}
						></input>

						<button
							className="p-3 bg-purple-500 text-white rounded-lg w-full mt-4"
							onClick={() => joinGame()}
						>
							Join
						</button>
					</div>
				</div>
			)}

			{winner && (
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white flex flex-col justify-center items-center">
					<div>
						<div className="text-4xl text-purple-500">
							{winner} won the game!
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-row justify-center h-screen items-center">
				{start ? (
					<>
						<div className="w-[300px] flex flex-wrap gap-5">
							{board &&
								board.map((sign, index) => {
									return (
										<Field
											key={index}
											index={index}
											icon={sign}
											fieldClick={() => fetchLog()}
											canMove={canMove}
											setCanMove={setCanMove}
										></Field>
									);
								})}
						</div>
						<div className="flex flex-col gap-2 items-start">
							<div className="mb-2">Logs</div>
							{logs &&
								logs.map((log) => {
									return <div dangerouslySetInnerHTML={{ __html: log }}></div>;
								})}
						</div>
					</>
				) : (
					<div className="text-4xl">Waiting for player to join...</div>
				)}
			</div>
		</>
	);
}

export default App;
