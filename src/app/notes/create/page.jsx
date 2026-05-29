"use client"
import { useState } from 'react'
import { useNotes } from '../NotesContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'


import Link from 'next/link'
import React from 'react'

function CreateNotePage() {
  const router = useRouter()



  const { addNote, getDynamicCategories } = useNotes()

  const categories = getDynamicCategories()

  const [tema, setTema] = useState("")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    ejemplo: "",
    category_id: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) return alert("Title and content are required")

    addNote(formData)
    router.push("/notes")
  }


  const handleAutoFill = async (e) => {
    e.preventDefault()
    if (!tema.trim() || loading) return
    setLoading(true)
    try { 
      const response = await axios.post("/api/generate-note", { tema })
      setFormData({
        title: response.data.result.title,
        content: response.data.result.content,
        ejemplo: response.data.result.ejemplo
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className='flex p-20 justify-center items-center w-full'>
      <form className="flex flex-col flex-1  p-6 rounded-lg bg-zinc-800 font-sans">

        <Link href={"/notes"} className="self-start mb-4 text-white font-semibold">
          &larr; Back to Notes
        </Link>

        <p className="text-white text-lg font-semibold">Create Note</p>

        <div className='mt-6 p-4 rounded border border-purple-500/30 gap-2  bg-zinc-900 flex flex-col'>
          <label className='text-purple-400 text-xs font-bold tracking-wider'>Itec Copilot</label>
          <div className='flex gap-2'>
            <input
              type="text"
              placeholder='Ej: Arrow function en JS...'
              className='flex-1 p-2 bg-zinc-800 rounded border border-zinc-700
              focus:outline-none focus:border-purple-500 '
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
            <button
              onClick={handleAutoFill}
              type='button'
              disabled={loading}
              className={`bg-purple-600 hover:bg-purple-700 text-xs px-4 py-1 
              font-bold rounded disabled:opacity-50 cursor-pointer ${loading && "animate-pulse"}`}
            >
              {loading ? "Generando..." : "Generar"}
            </button>

            <div className='spinner-border' role='status'>
              <p className='sr-only'>Loading...</p>
            </div>
          </div>


        </div>


        <div className='mt-10 flex flex-col gap-3'>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Title</label>
            <input
              type="text"
              placeholder='Title'
              className={`p-2 border border-zinc-600  
              rounded-md my-4 bg-zinc-900/80 focus:outline-none focus:border-purple-500 
              ${loading && "animate-pulse"}`}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Category</label>
            <select
              className={`cursor-pointer p-2 border border-zinc-600 bg-zinc-900/80 rounded-md my-4 ${loading && "animate-pulse"}`}
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: String(e.target.value) })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Content</label>
            <textarea
              placeholder='Content'
              className={`p-2 border border-zinc-600 rounded-md my-4 bg-zinc-900/80 focus:outline-none focus:border-purple-500 
              ${loading && "animate-pulse"}`}
              rows={10}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Ejemplo</label>
            <textarea
              placeholder='Const variable = ....'
              spellCheck={false}
              className={`p-2 border border-zinc-600 rounded-md my-4 bg-zinc-950 font-mono focus:outline-none focus:border-purple-500 
              ${loading && "animate-pulse"}`}
              rows={10}
              value={formData.ejemplo}
              onChange={(e) => setFormData({ ...formData, ejemplo: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            type='submit'
            className='bg-blue-500 text-white p-2 rounded-md cursor-pointer'>
            Save
          </button>
        </div>
      </form>

    </section>
  )
}

export default CreateNotePage