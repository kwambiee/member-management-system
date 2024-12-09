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
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context";
import { useAuth } from "@/context";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

const baseUrl = "https://member-management-backend.vercel.app/users";


    const signInFormSchema = z.object({
    email: z.string().min(6),
    password: z.string().min(8),
  });

export type signInFormValues = z.infer<typeof signInFormSchema>
    

export const SignInForm = () => {
    const {loginUser} = useAuth();
    const [formData, setFormData] = useState<signInFormValues | null>(null);
    const [error, setError] = useState("");
    const router = useRouter();



      const signInForm = useForm<signInFormValues>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signInSubmit = async (values: signInFormValues ) => {
        
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    if (response.ok) {
      const { token, userId } = await response.json();
      loginUser(token, userId);
      router.push("/dashboard");
    } else {
      alert("Invalid login credentials");
    }  
    }
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
};

export default SignInForm;