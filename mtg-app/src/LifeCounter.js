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
				<div>
					<h2>Players</h2>
					{players.map((player, index) => (
						<div key={index}>
							<input
							type="text"
							placeholder={player.name}
							value={player.name}
							onChange={(e) => handlePlayerNameChange(index, e.target.value)}
							/>
							<button onClick={() => handleRemovePlayer(index)}>Remove</button>
						</div>
					))}
					<button onClick={handleAddPlayer}>Add Player</button>
					{players.length > 2 && (
						<button onClick={handleConfirmPlayers}>Confirm</button>
					)}
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
					<button onClick={handleResetSettings}>Reset Settings</button>
				</div>
			)}
		</div>
    );
};

export default LifeCounter;