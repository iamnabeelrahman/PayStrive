"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/user.action";

const formSchema = (type: string) =>
  z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8, {
      message: "The password should be 8 characters or more.",
    }),
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1:
      type === "sign-in" ? z.string().optional() : z.string().min(5).max(80),
    state: type === "sign-in" ? z.string().optional() : z.string().min(3),
    city: type === "sign-in" ? z.string().optional() : z.string().min(3),
    zipCode:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .length(6)
            .regex(/^\d{6}$/, "Zipcode must be 6 digits"),
    dob: type === "sign-in" ? z.string().optional() : z.string(),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
  });

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = formSchema(type);

  // Use  schema with useForm
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      // username: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      zipCode: "",
      dob: "",
      ssn: "",
      city: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      console.log(data);
      setIsLoading(false);

      if (type === "sign-up") {
        const newUser = await signUp({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          // username: data.username,
          password: data.password,
          address1: data.address1,
          state: data.state,
          city: data.city,
          zipCode: data.zipCode,
          dateOfBirth: data.dob,
          ssn: data.ssn,
        })
      }

      if (type === "sign-in") {
        // const response = await SignIn({
        //   // username: data.username,
        //   email: data.email,
        //   password: data.password,
        // })
        // if (response) router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form bg-gradient-to-br from-green-200 via-white to-green-50 p-6 md:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto lg:max-w-[25%]">
      <header className="flex flex-col gap-6 md:gap-10 mb-10">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-3 justify-center"
        >
          <Image
            src="/icons/logo.svg"
            width={36}
            height={36}
            alt="Horizon logo"
            className="hover:scale-110 transform transition duration-300"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-gray-900">
            PayStrive
          </h1>
        </Link>
        <div className="text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details to continue"}
          </p>
        </div>
      </header>

      {user ? (
        <div>{/* Plaid Link Component */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            First Name
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            Last Name
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            Date of Birth
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="yyyy-mm-dd"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ssn"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            SSN
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="ex: 1234"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="block text-lg font-medium text-gray-700">
                          City
                        </FormLabel>
                        <div className="mt-2">
                          <FormControl>
                            <Input
                              placeholder="City name"
                              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-1 text-sm text-red-500" />
                        </div>
                      </div>
                    )}
                  />

                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            Zip Code
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="Enter your Zip Code"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="block text-lg font-medium text-gray-700">
                            State
                          </FormLabel>
                          <div className="mt-2">
                            <FormControl>
                              <Input
                                placeholder="Enter your state"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="mt-1 text-sm text-red-500" />
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="block text-lg font-medium text-gray-700">
                          Address1
                        </FormLabel>
                        <div className="mt-2">
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-1 text-sm text-red-500" />
                        </div>
                      </div>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="block text-lg font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <div className="mt-2">
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-500" />
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="block text-lg font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <div className="mt-2">
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-500" />
                    </div>
                  </div>
                )}
              />
              <Button
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 transition"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Loading...
                  </div>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <div className="flex justify-center gap-2 mt-6">
            <p className="text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="font-medium text-green-500 hover:text-green-600 transition"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default AuthForm;
