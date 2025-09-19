
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Mail, Phone } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();
  
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Get in Touch
          </h2>
          <p className="text-lg text-foreground/80">
            Have questions or need assistance? Our team is here to help.
          </p>
          <div className="flex items-start gap-4 pt-4">
            <Mail className="h-8 w-8 text-primary mt-1"/>
            <div>
              <h3 className="font-semibold text-lg">Email Us Directly</h3>
              <p className="text-foreground/80">support@nexusbank.com</p>
            </div>
          </div>
           <div className="flex items-start gap-4 pt-4">
            <Phone className="h-8 w-8 text-primary mt-1"/>
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-foreground/80">1800-200-5555 (Toll-Free)</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-muted-foreground">For support, please email or call us directly. The contact form has been removed.</p>
        </div>
      </div>
    </section>
  );
}
