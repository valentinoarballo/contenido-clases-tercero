import { describe, it, expect } from "vitest";
import { notesSchema } from "../validations/NotesSchema";

describe("Pruebas para notesSchema", () => {

    it("debe fallar si el titulo esta vacio", () => {
        const invalidData = {
            title: "",
            content: "Contenido valido con mas de 10 caracteres",
            categoryId: "cat_123"
        }

        const result = notesSchema.safeParse(invalidData)

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El titulo es obligatorio")
        }
    })

    it("debe fallar si el titulo supera los 40 caracteres", () => {
        const invalidData = {
            title: "A".repeat(41),
            content: "Contenido valido con mas de 10 caracteres",
            categoryId: "cat_123"
        }

        const result = notesSchema.safeParse(invalidData)
        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El titulo debe tener menos de 40 caracteres")
        }
    })

    it("debe fallar si el contenido tiene menos de 10 caracteres", () => {
        const invalidData = {
            title: "Titulo OK",
            content: "Corto",
            categoryId: "cat_123"
        }

        const result = notesSchema.safeParse(invalidData)

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El contenido debe tener al menos 10 caracteres")
        }
    })

    it("debe fallar si no se selecciona una categoria", () => {
        const invalidData = {
            title: "Titulo OK",
            content: "Contenido valido con mas de 10 caracteres",
            categoryId: ""
        }

        const result = notesSchema.safeParse(invalidData)

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar una categoria")
        }
    })

    it("debe permitir crear la nota sin el campo ejemplo", () => {
        const invalidData = {
            title: "Titulo OK",
            content: "Contenido valido con mas de 10 caracteres",
            categoryId: "cat_123"
        }

        const result = notesSchema.safeParse(invalidData)

        expect(result.success).toBe(true)

    })
})




