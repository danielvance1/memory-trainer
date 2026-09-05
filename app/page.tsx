'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Row = {
  id: number
  text: string
}

export default function Home() {
  const [rows, setRows] = useState<Row[]>([])
  const [inputValue, setInputValue] = useState('')
  const [displayEmail, setDisplayEmail] = useState('Loading...')

  useEffect(() => {
    fetchRows()
  }, [])

  useEffect(() => {
    async function loadUserDisplay() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user === null) {
        setDisplayEmail('Not logged in')
      }
      else {
        setDisplayEmail(user.email ?? "<no email>")
      }
    }

    loadUserDisplay()
  }, [])

  async function fetchRows() {
    const { data, error } = await supabase.from('test_table').select('*')
    if (error) {
      console.error('Error fetching:', error)
    } else {
      setRows(data as Row[])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase
      .from('test_table')
      .insert({ text: inputValue })

    if (error) {
      console.error('Error inserting:', error)
    } else {
      setInputValue('')
      fetchRows()
    }
  }

  async function handleDelete(rowId: number){
    const { error } = await supabase
      .from('test_table')
      .delete()
      .eq('id', rowId)

    if (error) {
      console.error('Error deleting:', error)
    } else {
      fetchRows()
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <p>{displayEmail}</p>
      <h1>Supabase Read/Write Test</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => handleDelete(row.id)} className="border border-purple-200 text-purple-600 rounded px-3 py-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}