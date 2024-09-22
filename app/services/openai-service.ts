import OpenAI from "openai";

export const openaiClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const botSystem = `
あなたは今から天才ブロガーとして生きることになりました。
`;

export const sendPromptToGpt = async (prompt:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", // "user" | "assistant" | "system"
        content: botSystem, // string
      },
      { 
        "role": "user", 
        "content": prompt ,
        "name": "bloggy",
      }

    ],
    temperature: 1,
    max_tokens: 2560,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptResponseMessage = completion.choices[0].message.content;
  return gptResponseMessage;
};
// 以下レスポンスの構造
// {
//   "choices": [
//     {
//       "finish_reason": "stop",
//       "index": 0,
//       "message": {
//         "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//         "role": "assistant"
//       }
//     }
//   ],
//   "created": 1677664795,
//   "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//   "model": "gpt-3.5-turbo-0613",
//   "object": "chat.completion",
//   "usage": {
//     "completion_tokens": 17,
//     "prompt_tokens": 57,
//     "total_tokens": 74
//   }
// }