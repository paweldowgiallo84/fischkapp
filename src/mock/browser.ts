import { setupServer } from 'msw/node'
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

export {server};