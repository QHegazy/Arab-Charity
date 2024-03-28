'use client';

import { useChat } from 'ai/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import PageTitle from "@/components/PageTitle"
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className='p-6'>
      <PageTitle title='المساعد الذكي' />
      <div className="flex flex-col  w-full max-w-md py-24 mx-auto stretch text-xl gap-2">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}

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