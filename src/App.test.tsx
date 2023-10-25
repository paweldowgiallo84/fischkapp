import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import  App from './App'
import { setupServer } from "msw/node"
import { rest } from 'msw'

const data = [
    {
        _id: "cardId1",
        front: "question1",
        back: "answer1",
    },
    {
        _id: "cardId2",
        front: "question2",
        back: "answer2",
    }
]

const server = setupServer(  
    rest.get('https://training.nerdbord.io/api/v1/fischkapp/flashcards', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(data)
        )
    })
)

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

    it('Show "Add your first flashcard" when ther is no cards added', () => {
        render(<App />)
        const noCards = screen.getByText('Add your first flashcard');
        expect(noCards).toBeInTheDocument()       
        })    
   
})