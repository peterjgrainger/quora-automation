import { addQuestion } from "../src";

describe('add a question', ()=> {
    it('should fail', async()=> {
        const result = await addQuestion('question', {
            username: 'p.grainger@yahoo.com',
            password: '00Charly00'
        })
        expect(result).toBe('This question needs more detail. Add more information to ask a clear question, written as a complete sentence. ')
        
    }, 50000)

    it('duplicate', async()=> {
        const result = await addQuestion('Does donald trump lie?', {
            username: 'p.grainger@yahoo.com',
            password: '00Charly00'
        })
        expect(result).toBe('The question Does Donald Trump lie? has already been asked')
        
    }, 50000)

    
})