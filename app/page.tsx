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

  useEffect(() => {
    fetchRows()
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

  return (
    <div style={{ padding: '2rem' }}>
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
          <li key={row.id}>{row.text}</li>
        ))}
      </ul>
    </div>
  )
}