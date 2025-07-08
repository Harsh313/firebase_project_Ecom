'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.3 76.3C324.7 112.3 289.6 96 248 96c-88.8 0-160.1 71.1-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
    </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = async (action: 'login' | 'signup') => {
    setLoading(true);
    try {
      if (action === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Success!', description: 'Account created successfully. You are now logged in.' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
      }
      router.push('/');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: err.code });
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({ title: 'Welcome!', description: 'You have successfully signed in with Google.' });
        router.push('/');
    } catch (err: any) {
        toast({ variant: 'destructive', title: 'Authentication Error', description: err.code });
    } finally {
        setLoading(false);
    }
  }

  const renderForm = (type: 'login' | 'signup') => {
    const title = type === 'login' ? 'Login' : 'Sign Up';
    const description = type === 'login' 
        ? 'Enter your credentials to access your account.' 
        : 'Create a new account to get started.';

    return (
        <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`email-${type}`}>Email</Label>
                <Input id={`email-${type}`} type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`password-${type}`}>Password</Label>
                <Input id={`password-${type}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
              </div>
              <Button onClick={() => handleAuthAction(type)} className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {title}
              </Button>
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                {title} with Google
              </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="container flex items-center justify-center py-12">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => { setEmail(''); setPassword('')}}>Login</TabsTrigger>
          <TabsTrigger value="signup" onClick={() => { setEmail(''); setPassword('')}}>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          {renderForm('login')}
        </TabsContent>
        <TabsContent value="signup">
          {renderForm('signup')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
