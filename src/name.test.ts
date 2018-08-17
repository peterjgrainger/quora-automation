import { addQuestion } from "../src";

describe('add a question', ()=> {
    it('should fail', async()=> {
        const result = await addQuestion('question', {
            username: '',
            password: ''
        })
        expect(result).toBe('This question needs more detail. Add more information to ask a clear question, written as a complete sentence. ')
        
    }, 50000)

    it('duplicate', async()=> {
        const result = await addQuestion('is donald trump evil?', {
            username: '',
            password: ''
        })
        expect(result).toBe('The question Does Donald Trump lie? has already been asked')
        
    }, 50000)

    
})