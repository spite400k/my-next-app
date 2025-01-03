// app/api/response/route.ts

import { NextResponse } from 'next/server';
import { sendPromptToGpt } from "@/app/services/openai-service";
import OpenAI from 'openai';
import { MessageType } from '@/app/type/MessageType';

export async function POST(request: Request) {

  const { prompt ,chatLog} = await request.json();

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
      content: prompt ,
    },
  ];

  {
    chatLog.map((message:MessageType) => {
      messages.push(
        {
          role: "assistant", // "user" | "assistant" | "system"
          content: message.content, // string
        }
      )
    })
  }
  
  const gptResponseMessage = await sendPromptToGpt(messages);
  const response = NextResponse.json({ gptResponseMessage })
  return response;
  }