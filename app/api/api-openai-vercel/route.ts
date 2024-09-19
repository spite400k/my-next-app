import {OpenAIStream, StreamingTextResponse} from 'ai'
import {Configuration, OpenAIApi} from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY // ご自身のOpenAI APIキー sk-xxx
})
const openai = new OpenAIApi(config)

// Edge Runtimeにデプロイします
export const runtime = 'edge'

export async function POST(req: Request) {
    // プロンプトを受け取ります
    const {messages} = await req.json()

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            top_p: 0.75,
            // temperature: 0.9,	    
            stream: true, // レスポンスをServer Sent Eventで返します
            messages
        })

        // ブラウザ側にもストリームでパラパラ返します
        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)

    } catch (error) {
        return new Response(JSON.stringify({error: 'An error occurred while creating the chat completion'}), {status: 500})
    }
}