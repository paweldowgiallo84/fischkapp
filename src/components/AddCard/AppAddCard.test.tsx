import React from "react";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { AppAddCard } from "./AppAddCard";
import { setupServer } from 'msw/node'
import { rest } from 'msw'

// const server = setupServer(
//     rest.post('https://training.nerdbord.io/api/v1/fischkapp/flashcards', async (req, res, ctx) => {
//         const data = await req.json()
//         const (front, back) = data
//         if(front === '' || back === '') {
//             return res
//             ctx.status(400, 'Incorrectly filled in fiche... Correct data.')
//         }
//     })
// )

// // Start server
// beforeAll(() => {
//     server.listen()
// })

// // reset server
// afterEach(() => {
//     server.resetHandlers
// })

// // Stop server
// afterAll(() => {
//     server.close()
// })

describe('AppAdCard', () => {
    it('Should not be possible to ad card if front or back value is empty', async () => {
        render(<AppAddCard cancelAddCard={function (): void { }} />)

        const questionInput = screen.getByTestId('question')
        expect(questionInput).toBeInTheDocument()
        expect(questionInput).toHaveValue('')
        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeInTheDocument()
        userEvent.click(nextButton)

        await waitFor(() => {
            const answerInput = screen.getByTestId('answer')
            expect(answerInput).toBeInTheDocument()
            expect(answerInput).toHaveValue('')
            const saveButton = screen.getByText('Save')
            expect(saveButton).toBeInTheDocument()
            userEvent.click(saveButton)
        })

        await waitFor(() => {
            const errorMessage = screen.getByText('Incorrectly filled in fiche... Correct data.')
            expect(errorMessage).toBeInTheDocument()
        })
    })
    it('Should be possible to ad card if front and back value is not empty', async () => {
        render(<AppAddCard cancelAddCard={function (): void { }} />)

        const questionInput = screen.getByTestId('question')
        expect(questionInput).toBeInTheDocument()
        userEvent.type(questionInput, 'question')
        await waitFor(() => {
            expect(questionInput).toHaveValue('question')
        })
        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeInTheDocument()
        userEvent.click(nextButton)

        await waitFor(async () => {
            const answerInput = screen.getByTestId('answer')

            expect(answerInput).toBeInTheDocument()
            userEvent.type(answerInput, 'answer')
            await waitFor(() => {
                expect(answerInput).toHaveValue('answer')
            })
            const saveButton = screen.getByText('Save')
            expect(saveButton).toBeInTheDocument()
            userEvent.click(saveButton)
        })

        await waitFor(() => {
            const errorMessage = screen.queryByText('Incorrectly filled in fiche... Correct data.')
            expect(errorMessage).not.toBeInTheDocument()
            
        })
    })
})