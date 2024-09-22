// app/api/response/route.ts

import { NextResponse } from 'next/server';
import { openaiClient, sendPromptToGpt } from "@/app/services/openai-service";

export async function POST(request: Request) {
  
  const openai = openaiClient();

  const { prompt ,chatLog} = await request.json();
  
  const gptResponseMessage = await sendPromptToGpt(prompt,chatLog);
  const response = NextResponse.json({ gptResponseMessage })
  return response;
  }