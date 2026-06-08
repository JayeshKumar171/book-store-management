"use client"

import { useState } from "react"
import Link from "next/link"
import { Book, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { toast } from "sonner"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success("Account created successfully!")
    }, 1500)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2 group">
            <Book className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <h1 className="text-3xl font-bold tracking-tight">BookStore</h1>
          </Link>
          <p className="text-muted-foreground">Join the elite management system</p>
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-xl bg-card/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Personalize your experience and start managing today
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with email
                </span>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none" htmlFor="first-name">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" disabled={isLoading} required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none" htmlFor="last-name">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" disabled={isLoading} required />
                </div>
              </div>
              <div className="grid gap-2 mb-4">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2 mb-6">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  disabled={isLoading}
                  required
                />
              </div>
              <Button className="w-full h-11 text-base group" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Start Managing"}
                {!isLoading && <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </CardFooter>
        </Card>
        
        <p className="mt-8 px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
