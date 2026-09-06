'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import MappingBubble from "../components/MappingBubble"
import SingleDigitMappingBubbleContainer from '../components/SingleDigitMappingBubbleContainer'
import DoubleDigitMappingBubbleContainer from '../components/DoubleDigitMappingBubbleContainer'
import ScrollingMappingBubbleDisplay from '../components/ScrollingMappingBubbleDisplay'
import MappingEditor from '../components/MappingEditor'
import MappingsView from '../components/MappingsView'

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
  const [digitsDescriptionMappings, setDigitsDescriptionMappings] = useState<Record<string, string>>({})
  const [editedDigits, setEditedDigits] = useState('')
    const digitInputRef = useRef<HTMLInputElement>(null);

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
        setDisplayEmail(user.email ?? "<no email>")
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

            const randIdx: number = randBetween(0, rows.length-1)

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
      const newMappings: Record<string, string> = {}
      data.forEach((row) => {
        newMappings[row.digits] = row.description
      })
      setDigitsDescriptionMappings(newMappings)
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
        if(digitInputRef.current != null) {
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
    <div className="grid grid-cols-[1fr_1fr] h-screen w-full">
      <div></div>
      <MappingsView mappings={digitsDescriptionMappings} />
      {/* <MappingEditor mappings={digitsDescriptionMappings}/> */}
    </div>
  )
}