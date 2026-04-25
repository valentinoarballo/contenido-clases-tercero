import { getNoteById } from '@/lib/notes'
import NoteDetail from '@/app/components/NoteDetail'
import React from 'react'
import Link from 'next/link'


export default async function page({ params }) {

  const { id } = await params
  const nota = getNoteById(id)

  return (
    <div className="flex flex-1 items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <NoteDetail note={nota} />
    </div>
  )
}
