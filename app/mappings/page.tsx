'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type Row = {
  id: number
  digits: string
  description: string
}

export default function MappingsPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [digitInputValue, setDigitInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [displayEmail, setDisplayEmail] = useState('Loading...')
  const [digitChallengeValue, setDigitChallengeValue] = useState('')
  const [digitChallengeCorrectAnswer, setDigitChallengeCorrectAnswer] = useState('')
  const [inputAnswerValue, setInputAnswerValue] = useState('')
  const [completedChallenges, setCompletedChallenges] = useState(0)

    const digitInputRef = useRef(null);

  useEffect(() => {
    fetchRows()
  }, [])

  useEffect(() => {
    async function loadUserDisplay() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user === null || user.email === null) {
        setDisplayEmail('Not logged in')
      }
      else {
        setDisplayEmail(user.email ?? "")
      }
    }

    loadUserDisplay()
  }, [])

    useEffect(() => {
        async function getDigitChallenge() {
            if(rows===null || rows.length == 0) {
                console.log("rows had no values")
                return
            }

            let randIdx: number = randBetween(0, rows.length-1)

            console.log(`randIdx: ${randIdx}`)

            setDigitChallengeValue(rows[randIdx].digits)
            setDigitChallengeCorrectAnswer(rows[randIdx].description)
        }

        getDigitChallenge()
    }, [completedChallenges, rows])

    function randBetween(lo: number, hi: number) : number {
        lo = Math.floor(lo)
        hi = Math.floor(hi)

        if(lo>hi){
            return lo
        }

        return Math.floor(Math.random() * (hi - lo + 1)) + lo
    }

  async function fetchRows() {
    const { data, error } = await supabase.from('mappings').select('*')
    if (error) {
      console.error('Error fetching:', error)
    } else {
      setRows(data as Row[])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log(`attempting to submit digits=${digitInputValue} and description=${descriptionInputValue}`)

    const { error } = await supabase
      .from('mappings')
      .insert({ digits: digitInputValue, description: descriptionInputValue })

    if (error) {
      console.error('Error inserting:', error)
    } else {
      setDigitInputValue('')
      setDescriptionInputValue('')
      fetchRows()
        if(digitInputRef != null) {
          digitInputRef.current.focus()
        }
    }
  }

  async function handleDelete(rowId: number){
    const { error } = await supabase
      .from('mappings')
      .delete()
      .eq('id', rowId)

    if (error) {
      console.error('Error deleting:', error)
    } else {
      fetchRows()
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
        <div style={{ padding: '2rem' }}>
            <p>{displayEmail}</p>
            <h1>Add a new mapping</h1>

            <form onSubmit={handleSubmit}>
                <input
                ref={digitInputRef}
                value={digitInputValue}
                onChange={(e) => setDigitInputValue(e.target.value)}
                placeholder="Enter digits"
                />
                <input
                value={descriptionInputValue}
                onChange={(e) => {
                        setDescriptionInputValue(e.target.value)
                    }
                }
                placeholder="Enter description"
                />
                <button type="submit">Add</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Digits</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>{row.digits}</td>
                            <td>{row.description}</td>
                            <td>
                                <button onClick={() => handleDelete(row.id)} className="border border-purple-200 text-purple-600 rounded px-3 py-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="h-full grid grid-rows-2 grid-columns-1">
            <div className="bg-red-500">
                Number: {digitChallengeValue}
            </div>
            <div className="bg-blue-500">
                <div>
                    Score: {completedChallenges}
                </div>
                <input
                    value={inputAnswerValue}
                    onChange={(e) => {
                        setInputAnswerValue(e.target.value)
                        if(digitChallengeValue != "" && 
                            e.target.value.length>0 &&
                            e.target.value[0] == digitChallengeCorrectAnswer[0]){
                            setInputAnswerValue('')
                            setCompletedChallenges(completedChallenges+1)
                        }
                    }}
                    placeholder="Enter number description"
                />
            </div>
        </div>
    </div>
  )
}