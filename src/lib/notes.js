export const notes = [
  {
    id: "1",
    title: "Rutas en Next.js",
    content: "Next.js utiliza un sistema de rutas basado en el sistema de archivos dentro de la carpeta app. Cada archivo page.jsx define automáticamente una ruta accesible desde el navegador. Por ejemplo, app/page.jsx corresponde a la ruta '/', mientras que app/about/page.jsx corresponde a '/about'. Esto elimina la necesidad de configurar manualmente un router como en otras librerías.",
    createdAt: "2026-01-01",
    ejemplo: `
app/
  page.jsx        // → /
  about/
    page.jsx      // → /about

export default function Page() {
  return <h1>Home</h1>
}
    `
  },
  {
    id: "2",
    title: "Rutas dinámicas",
    content: "Las rutas dinámicas en Next.js permiten renderizar contenido basado en parámetros de la URL. Se definen usando corchetes en el nombre de la carpeta, como [id]. Next.js inyecta automáticamente estos valores en el objeto params dentro del componente, permitiendo acceder a datos dinámicos como IDs de una base de datos.",
    createdAt: "2026-01-02",
    ejemplo: `
app/notes/[id]/page.jsx

export default function Page({ params }) {
  return <h1>ID: {params.id}</h1>
}

// Ejemplo de uso
const note = getNoteById(params.id)
    `
  },
  {
    id: "3",
    title: "Rutas anidadas",
    content: "Las rutas anidadas permiten estructurar la aplicación en múltiples niveles utilizando carpetas dentro de otras carpetas. Esto ayuda a organizar mejor proyectos grandes y permite reutilizar layouts o lógica entre rutas relacionadas.",
    createdAt: "2026-01-03",
    ejemplo: `
app/
  dashboard/
    page.jsx            // → /dashboard
    settings/
      page.jsx          // → /dashboard/settings

// Navegación
<Link href="/dashboard/settings">Settings</Link>
    `
  },
  {
    id: "4",
    title: "Layouts en Next.js",
    content: "Los layouts permiten compartir UI entre múltiples páginas, como navbars, sidebars o footers. Se definen con un archivo layout.jsx y envuelven automáticamente a todas las páginas dentro de su carpeta. Reciben la prop children que representa el contenido de cada página.",
    createdAt: "2026-01-04",
    ejemplo: `
export default function Layout({ children }) {
  return (
    <div>
      <nav>Navbar</nav>
      {children}
    </div>
  )
}
    `
  },
  {
    id: "5",
    title: "Layouts anidados",
    content: "Next.js permite tener múltiples layouts anidados. Cada layout envuelve al siguiente nivel de la jerarquía, permitiendo construir estructuras complejas de UI. Por ejemplo, un layout global puede contener un navbar, mientras que un layout interno puede agregar un sidebar específico.",
    createdAt: "2026-01-05",
    ejemplo: `
app/
  layout.jsx
  dashboard/
    layout.jsx
    page.jsx

// Resultado:
// Layout global → Layout dashboard → Page
    `
  },
  {
    id: "6",
    title: "Componentes de servidor",
    content: "En Next.js App Router, los componentes son Server Components por defecto. Esto significa que se ejecutan en el servidor, no envían JavaScript innecesario al cliente y pueden acceder directamente a bases de datos o APIs. No pueden usar hooks como useState o useEffect, pero mejoran significativamente el rendimiento.",
    createdAt: "2026-01-06",
    ejemplo: `
export default async function Page() {
  const data = await fetch("https://api.example.com")

  return (
    <div>
      <h1>Datos:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
    `
  },
]

export const getNotes = () => notes

export const getNoteById = (id) =>
  notes.find((note) => note.id === id)

