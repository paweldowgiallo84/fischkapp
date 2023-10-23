import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'


const server = setupServer(//    
    http.get('https://training.nerdbord.io/api/v1/fischkapp/flashcards', () => {
        return HttpResponse.json([
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
        ])
    })
)

export {server};