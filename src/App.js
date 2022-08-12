import React, { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
  const [tenzies, setTenzies] = useState(false)

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }
  const getNewDice = () => {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  const [dice, setDice] = useState(getNewDice())
  const rollDice = () => {
    if (!tenzies) {
      setDice(
        dice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setDice(getNewDice())
      setTenzies(false)
    }
  }

  const holdDice = (id) => {
    setDice(
      dice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    )
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('you won!')
    }
  }, [dice])

  return (
    <div className='app'>
      {tenzies && <Confetti />}
      <h2 className='title'>Tenzies</h2>
      <p className='desc'>Roll until all dice are the same.</p>
      <div className='dice-container'>
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            id={die.id}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button className='roll-btn' onClick={rollDice}>
        {tenzies ? 'Reset Game' : 'Roll Dice 🎲'}
      </button>
    </div>
  )
}

export default App
