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

const signUpFormSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type signUpFormValues = z.infer<typeof signUpFormSchema>
const baseUrl = "https://member-management-backend.vercel.app";

const SignUpForm = () => {
    const { registerUser } = useAuth();
    const [loading, setLoading] = useState(true);

    const signUpForm = useForm<signUpFormValues>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const signUpSubmit = async (values: signUpFormValues) => {
        try {
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
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-gray-100 to-gray-300">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Create an Account
                </h2>
                <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(signUpSubmit)}>
                        {/* Username */}
                        <FormField
                            control={signUpForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-600">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            placeholder="john"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={signUpForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-600">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            placeholder="johndoe@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={signUpForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-600">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 mt-4 transition-colors"
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}

export default SignUpForm;