"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number


const signUpFormSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().min(6).regex(emailRegex, "Invalid email address"),
  password: z.string().min(8).regex(passwordRegex, "Password must be at least 8 characters long and contain at least one letter and one number"),
});

const signInFormSchema = z.object({
    email: z.string().min(6).regex(emailRegex, "Invalid email address"),
    password: z.string().min(8).regex(passwordRegex, "Password must be at least 8 characters long and contain at least one letter and one number"),
  });

export type signUpFormValues = z.infer<typeof signUpFormSchema>

export type signInFormValues = z.infer<typeof signInFormSchema>

const signUpForm  = useForm<signUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
    },
    })

    const signInForm = useForm<signInFormValues>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signUpSubmit = async (values: signUpFormValues ) => {
        console.log(values)
    }

    const signInSubmit = async (values: signInFormValues ) => {
        console.log(values)
    }

export const SignUpForm = () => {

    return (
        <Form {...signUpForm}>
        < form onSubmit={signUpForm.handleSubmit(signUpSubmit)}>
            <FormField control={signUpForm.control} name="username" render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="john" {...field} />
                    </FormControl>
                </FormItem>
            )} >
                
                </FormField>
            <FormField control={signUpForm.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                </FormItem>
            )} >
                </FormField>
            <FormField control={signUpForm.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                </FormItem>
            )} >
                </FormField>
            <Button type="submit">Submit</Button>
           
        </form>
        </Form>
    )
}

export const SignInForm = () => {
    return (
        <Form {...signInForm}>
        <form onSubmit={signInForm.handleSubmit(signInSubmit)}>
            <FormField control={signInForm.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email" {...field} />
                    </FormControl>
                </FormItem>
            )} >
                </FormField>
            <FormField control={signInForm.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                </FormItem>
            )} >
                </FormField>
            <Button type="submit">Submit</Button>
        </form>
        </Form>
    )
}





