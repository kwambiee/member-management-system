"use client"
import { useState } from "react";                             
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

import { useAuth } from "@/context"
import { Label } from "@/components/ui/label"

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number


const signUpFormSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().min(6),
  password: z.string().min(8),
});


export type signUpFormValues = z.infer<typeof signUpFormSchema>
const baseUrl = "https://member-management-backend.vercel.app/users";



const signUpForm  = useForm<signUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
    },
    })

const SignUpForm = () => {

    const {registerUser} = useAuth();
    const [formData, setFormData] = useState<signUpFormValues | null>(null);
    const [loading, setLoading] = useState(true);

    const signUpSubmit = async (values: signUpFormValues ) => {
        try{
            const response = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            const { token, userId } = await response.json();
            registerUser(userId, token);
        } else {
            const { error } = await response.json();
            console.log(error);
        }       
    }catch (error) {
        console.log(error);
    }finally {
        setLoading(false);
    }
}
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

export default SignUpForm;