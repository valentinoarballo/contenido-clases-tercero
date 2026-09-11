import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { it, describe, expect, vi, beforeEach } from "vitest";

import CreateNotePage from "../notes/create/page";


const mockPush = vi.fn()
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush
    })
}))

const mockAddNote = vi.fn()
const mockGetDynamicCategories = vi.fn().mockReturnValue([
    {id: "cat_1", title: "ejemplo"},
    {id: "cat_2", title: "ejemplo2"},
])

vi.mock("../context/NotesContext", () => ({
    useNotes: () => ({
        addNote: mockAddNote,
        GetDynamicCategories: mockGetDynamicCategories,
    })
}))


describe("")