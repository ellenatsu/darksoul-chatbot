"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = () => {
  const form = useForm({
    resolver: formSchema,
    defaultValues: {
      content: "",
    },
  });

  //submit value is form
  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl >
                <div className="flex items-center space-x-2">
                  <Input placeholder="Enter your questions..." {...field} />
                  <Button type="submit">Send</Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
      </form>
    </Form>
  );
};
