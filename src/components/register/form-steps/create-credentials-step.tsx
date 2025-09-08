
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormHeader } from "@/components/open-account/form-header";
import { Separator } from "@/components/ui/separator";

const securityQuestions = [
    "What was your first pet's name?",
    "What is your mother's maiden name?",
    "What was the name of your elementary school?",
    "In what city were you born?",
];

export function CreateCredentialsStep() {
  const { control } = useFormContext();

  return (
    <div>
        <FormHeader 
            title="Create Your Login Credentials"
            description="Choose a unique username and a strong password to secure your account."
        />
      <div className="space-y-4">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a unique username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a strong password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-8" />

        <div>
            <h3 className="text-lg font-medium">Security Question (Optional)</h3>
            <p className="text-sm text-muted-foreground mb-4">This helps in recovering your password.</p>
             <div className="space-y-4">
                <FormField
                    control={control}
                    name="securityQuestion"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Select a Question</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a security question" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {securityQuestions.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name="securityAnswer"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Your Answer</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your answer" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
             </div>
        </div>
      </div>
    </div>
  );
}
