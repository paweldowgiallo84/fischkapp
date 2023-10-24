import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import  App from './App'
import { server } from "./mock/browser";

// Start server
beforeAll(() => {
    server.listen()
})

// reset server
afterEach(() => {
    server.resetHandlers
})

// Stop server
afterAll(() => {
    server.close()
})


describe('App', () => {
    render(<App />)

    it('Show "Add your first flashcard" when ther is no cards added', () => {
        const noCards = screen.getByText('Add your first flashcard');
        expect(noCards).toBeInTheDocument()
    })
    

})