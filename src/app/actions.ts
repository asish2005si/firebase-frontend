
"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function submitContactRequest(
  values: z.infer<typeof contactFormSchema>
): Promise<{ success: boolean; message: string }> {
  try {
    // Here you would implement your backend logic, e.g., send an email, save to a database.
    // For this example, we'll just log it and simulate a successful response.
    console.log("Received contact form submission:", values);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // You can add error handling here, for example:
    // if (!process.env.EMAIL_API_KEY) {
    //   return { success: false, message: "Server configuration error. Could not send email." };
    // }

    return {
      success: true,
      message: "Your request has been submitted successfully.",
    };
  } catch (error) {
    console.error("Error submitting contact request:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

const supportTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  category: z.string({ required_error: "Please select a category." }),
});

export async function submitSupportTicket(
  values: z.infer<typeof supportTicketSchema>
): Promise<{ success: boolean; message: string }> {
    try {
        console.log("Received support ticket submission:", values);
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: `Your ticket (Subject: ${values.subject}) has been successfully created. Our team will get back to you shortly.`,
        };
    } catch (error) {
        console.error("Error submitting support ticket:", error);
        return {
            success: false,
            message: "An unexpected error occurred while creating your ticket. Please try again later.",
        };
    }
}
