// app/api/response/route.ts

import { NextResponse } from 'next/server';
import { sendPromptToGpt } from "@/app/services/openai-service";
import OpenAI from 'openai';

export async function POST(request: Request) {
  

  const { prompt ,num} = await request.json();

  const botSystem = `
    あなたは今から天才ブロガーとして生きることになりました。
  `;

  const messages :OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system", // "user" | "assistant" | "system"
      content: botSystem, // string
    },
    { 
      role: "user", 
      content: "次のカテゴリからブログ記事に適切なトピックを"+{num}+"つ選んでください。 その時トピックのリストだけ返して　" + prompt ,
    },
  ];
    
  const gptResponseMessage = await sendPromptToGpt(messages);
  const response = NextResponse.json({ gptResponseMessage })
  return response;
  }