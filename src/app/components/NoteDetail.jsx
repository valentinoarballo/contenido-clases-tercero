"use client"
import { useState } from 'react';

export default function NoteDetail({ note }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (note.ejemplo) {
      navigator.clipboard.writeText(note.ejemplo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

  };

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {note.title}
        </h1>
      </div>

      <p className='text-justify'>
        {note.content}
      </p>

      {/* Ejemplo de como funcionan los arrays */}
      <section className='w-full min-h-64 my-8 p-4 rounded-lg flex flex-col bg-zinc-800 text-white justify-between'>
        <p className='text-lg font-semibold'>Ejemplo Arrays</p>

        <div className="relative group">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 cursor-pointer"
          >

            {copied ? (
              <svg width="20" height="20" fill="currentColor" className="bi bi-clipboard-check text-green-400" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            )}
          </button>
          <pre className='text-sm min-h-64 text-white bg-black rounded p-2 overflow-x-auto'>
            <code >
              {note.ejemplo}
            </code>
          </pre>
        </div>
      </section>

    </main>
  )
}