const {GoogleGenAI} = require("@google/genai")

const askGemini = async(req,res)=>{

    try {
         const {question} = req.body

        // validation

        if(!question){
            return res.status(400).json({
                success: false,
                message: "Question is required"
            })
        }

        // create Gemini client

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })


        // Send question to Gemini

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents:  `
                Answer the following question in simple and easy English.

                Give a clear, useful, and focused answer in a maximum of 500 words.
                Explain the topic properly so that a beginner can understand it easily.

                Do not use markdown symbols like # or *.
                Keep the answer relevant to the question.

                Question: ${question}
            `
        })

        // get generated text

        const answer = response.text

        // send answer to frontend

        res.status(200).json({
            success: true,
            answer: answer

        })
        
    } catch (error) {
        console.log("Gemini Error:",error)

        res.status(500).json({
            success: false,
            message: "Something went wrong while communicating with Gemini."
        })
        
    }

}


module.exports = {
    askGemini
}