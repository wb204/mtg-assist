import React, { useState } from 'react';

const LifeCounter = () => {
    const [step, setStep] = useState(1);
    const [players, setPlayers] = useState([]);
    const [startingLife, setStartingLife] = useState(20);
    const [activeLife, setActiveLife] = useState([]);
    const [editingSettings, setEditingSettings] = useState(true);
  
    const handleAddPlayer = () => {
      const updatedPlayers = [...players, { name: `Player ${players.length + 1}`, life: startingLife }];
      setPlayers(updatedPlayers);
    };
  
    const handleRemovePlayer = (index) => {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setPlayers(updatedPlayers);
    };
  
    const handlePlayerNameChange = (index, name) => {
      const updatedPlayers = [...players];
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
      setActiveLife([...players.map((player) => player.life)]);
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
            <h2>Step 1: Add or Remove Players</h2>
            {players.map((player, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={player.name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                />
                {players.length > 2 && (
                  <button onClick={() => handleRemovePlayer(index)}>Remove</button>
                )}
              </div>
            ))}
            <button onClick={handleAddPlayer}>Add Player</button>
            <button onClick={handleConfirmPlayers}>Confirm Players</button>
          </div>
        )}
  
        {editingSettings && step === 2 && (
          <div>
            <h2>Step 2: Set Starting Life</h2>
            <input
              type="number"
              value={startingLife}
              onChange={(e) => setStartingLife(parseInt(e.target.value, 10))}
            />
            {console.log(startingLife)}
            <button onClick={handleConfirmStartingLife}>Confirm Starting Life</button>
          </div>
        )}
  
        {editingSettings && step === 3 && (
          <div>
            <h2>Step 3: Confirm Settings</h2>
            <button onClick={handleConfirmSettings}>Confirm Settings</button>
            {console.log(startingLife)}
          </div>
        )}
  
        {!editingSettings && (
          <div>
            <h2>Active Life Counters</h2>
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