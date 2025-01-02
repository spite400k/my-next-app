// app/api/response/route.ts

import { NextResponse } from 'next/server';
import { openaiClient, sendPromptToGpt } from "@/app/services/openai-service";
import OpenAI from 'openai';
import { MessageType } from '@/app/type/MessageType';

export async function POST(request: Request) {
  
  const openai = openaiClient();

  const { prompt ,chatLog} = await request.json();

  const botSystem = `
    あなたは今から天才ブロガーとして生きることになりました。
  `;

  let messages :OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system", // "user" | "assistant" | "system"
      content: botSystem, // string
    },
    { 
      role: "user", 
      content: "次のカテゴリからブログ記事に適切なトピックを５つ選んでください。 その時トピックのリストだけ返して　" + prompt ,
    },
  ];
    
  const gptResponseMessage = await sendPromptToGpt(messages);
  const response = NextResponse.json({ gptResponseMessage })
  return response;
  }