import React, { useState } from 'react';

const LifeCounter = () => {
	const [step, setStep] = useState(1);
	const [players, setPlayers] = useState([]);
	const [startingLife, setStartingLife] = useState(20);
	const [activeLife, setActiveLife] = useState([]);
	const [editingSettings, setEditingSettings] = useState(true);
	const updatedPlayers = [...players];

	const handleAddPlayer = () => {
		const updatedPlayers = [...players, { name: `Player ${players.length + 1}` }];
		setPlayers(updatedPlayers);
	};

	const handleRemovePlayer = (index) => {
		updatedPlayers.splice(index, 1);
		setPlayers(updatedPlayers);
	};

	const handlePlayerNameChange = (index, name) => {
		updatedPlayers[index].name = name;
		setPlayers(updatedPlayers);
	};

	const handleConfirmPlayers = () => {
		setStep(2);
	};

	const handleConfirmStartingLife = () => {
		setStep(3);
		setStartingLife(startingLife);
	};

	const handleConfirmSettings = () => {
		setActiveLife([...players.map((player) => player.life = startingLife)]);
		setEditingSettings(false);
	};

	const handleLifeChange = (index, change) => {
		const updatedLife = [...activeLife];
		updatedLife[index] += change;
		setActiveLife(updatedLife);
	};

	const handleResetLife = () => {
		setActiveLife([...players.map((player) => player.life = startingLife)]);
	};

	const handleResetSettings = () => {
		setStep(1);
		setPlayers([]);
		setStartingLife(20);
		setActiveLife([]);
		setEditingSettings(true);
	};

	return (
		<div>
			{editingSettings && step === 1 && (
				<div className="flex-column">
					<h2>Players</h2>
					{players.map((player, index) => (
						<div className="flex my-2 gap-4" key={index}>
							<input
							className="h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
							type="text"
							placeholder={player.name}
							value={player.name}
							onChange={(e) => handlePlayerNameChange(index, e.target.value)}
							/>
							<button className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600" onClick={() => handleRemovePlayer(index)}>Remove</button>
						</div>
					))}
					<div className="flex mt-3 gap-4">
						<button onClick={handleAddPlayer}>Add Player</button>
						{players.length > 2 && (
							<button onClick={handleConfirmPlayers}>Confirm</button>
						)}
					</div>
				</div>
			)}
	
			{editingSettings && step === 2 && (
				<div>
					<h2>Starting Life</h2>
					<input
					type="number"
					value={startingLife}
					onChange={(e) => setStartingLife(parseInt(e.target.value, 10))}
					/>
					<button onClick={handleConfirmStartingLife}>Confirm</button>
				</div>
			)}
	
			{editingSettings && step === 3 && (
				<div>
					<h2>Confirm Settings</h2>
					<p>Players:</p>
					<ul>
						{players.map((player, index) => (
							<li key={index}>{`${player.name}`}</li>
						))}
					</ul>
					<p>Starting Life: {startingLife}</p>
					<button onClick={handleConfirmSettings}>Begin Match</button>
				</div>
			)}
	
			{!editingSettings && (
				<div>
					{players.map((player, index) => (
						<div key={index}>
							<p>{`${player.name}: ${activeLife[index]}`}</p>
							<button onClick={() => handleLifeChange(index, -1)}>-1</button>
							<button onClick={() => handleLifeChange(index, 1)}>+1</button>
						</div>
					))}
					<button onClick={handleResetLife}>Reset Life</button>
					<button onClick={handleResetSettings}>Reset Settings</button>
				</div>
			)}
		</div>
    );
};

export default LifeCounter;