"use client"
import { useState } from 'react'
import { useNotes } from '../NotesContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notesSchema } from '@/app/validations/NotesSchema'

import Link from 'next/link'
import React from 'react'

function CreateNotePage() {
  const router = useRouter()

  const { addNote, getDynamicCategories } = useNotes()

  const categories = getDynamicCategories()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      title: "",
      content: "",
      ejemplo: "",
      categoryId: "",
    }
  })

  const onSubmit = (data) => {
    addNote(data)
    router.push("/notes")
  }

  return (
    <section className='flex p-20 justify-center items-center w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1  p-6 rounded-lg bg-zinc-800 font-sans">

        <Link href={"/notes"} className="self-start mb-4 text-white font-semibold">
          &larr; Back to Notes
        </Link>

        <p className="text-white text-lg font-semibold">Create Note</p>
        <div className='mt-10 flex flex-col gap-3'>

          <div className='flex flex-col'>
            <p className='text-zinc-400 text-lg'>Title <label className='text-sm text-red-800 animate-pulse'>{errors.title && "*" + errors.title.message}</label></p>
            <input
              type="text"
              placeholder='Title'
              className='p-2 border border-zinc-600 rounded-md my-4'
              // value={formData.title}
              // onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              {...register("title")}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Category</label>
            <select
              className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
              // value={formData.categoryId}
              // onChange={(e) => setFormData({ ...formData, categoryId: String(e.target.value) })}
              {...register("categoryId")}
            >

              <option disabled={true} >Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-400'>Content <label className='text-sm text-red-800 animate-pulse'>{errors.content && "*" + errors.content.message}</label> </p>
            <textarea
              placeholder='Content'
              className='p-2 border border-zinc-600 rounded-md my-4'
              rows={10}
              // value={formData.content}
              // onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              {...register("content")}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-zinc-400'>Ejemplo</label>
            <textarea
              placeholder='Const variable = ....'
              className='p-2 border border-zinc-600 rounded-md my-4'
              rows={10}
              // value={formData.ejemplo}
              // onChange={(e) => setFormData({ ...formData, ejemplo: e.target.value })}
              {...register("ejemplo")}
            />
          </div>

          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Save</button>
        </div>
      </form>

    </section>
  )
}

export default CreateNotePage