"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactRequest(
  values: z.infer<typeof contactFormSchema>
) {
  // Here you would implement your backend logic, e.g., send an email, save to a database.
  // For this example, we'll just log it and simulate a successful response.
  
  console.log("Received contact form submission:", values);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // You can add error handling here, for example:
  // if (!process.env.EMAIL_API_KEY) {
  //   return { success: false, message: "Server configuration error." };
  // }

  return {
    success: true,
    message: "Your request has been submitted successfully.",
  };
}
