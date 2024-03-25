'use client';

import { useChat } from 'ai/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import PageTitle from "@/components/PageTitle"
import { Bot, CircleUserRound } from 'lucide-react';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className='p-6'>
      <PageTitle title='المساعد الذكي' />
      <div className="flex flex-col  w-full max-w-md py-24 mx-auto stretch text-xl gap-4 text-right">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap flex items-center justify-start gap-2  text-right">
            <span>
              {m.role === 'user' ? <CircleUserRound /> : <Bot />}
            </span>
            <span>
              {m.content}
            </span>
          </div>
        ))}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> */}
        <form onSubmit={handleSubmit} className='w-full relative '>
          <Label className=' flex w-full flex-wrap items-center  mx-auto justify-center 
          rounded-3xl bottom-0 md:w-full left-0 md:left-auto max-w-md fixed mb-8 border border-gray-300 shadow-xl'>
            <Button type='submit' className='rounded-tl-none rounded-bl-none outline-none'>sumbit</Button>
            <Input
              className="w-full h-full  flex-1 rounded-tr-none rounded-br-none outline-none "
              value={input}
              placeholder="مرحبا ..."
              onChange={handleInputChange}
            />

          </Label>
        </form>
      </div>
    </div>

  );
}