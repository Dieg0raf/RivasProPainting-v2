import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight, ArrowLeft, X, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SERVICES, formSchema } from "./utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function QuoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const modalRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
      services: [],
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Goes to the server to submit the form data (api/quotes/routes.ts)
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!data.error) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          form.reset();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderMessageStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Details</h3>
      <FormField
        control={form.control}
        name="message"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>
              Project Description <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your project..."
                className="min-h-[150px]"
                onChange={onChange}
                // value={value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderServiceStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Services</h3>
      <FormField
        control={form.control}
        name="services"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>
              Select Services <span className="text-red-500">*</span>
            </FormLabel>
            <div className="space-y-6">
              {["Interior", "Exterior"].map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">
                    {category} Services
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {SERVICES.filter(
                      (service) => service.category === category
                    ).map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                      >
                        <Checkbox
                          checked={field.value?.includes(service.id)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, service.id]
                              : field.value?.filter(
                                  (value) => value !== service.id
                                );
                            field.onChange(updatedValue);
                          }}
                          id={service.id}
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {service.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(555) 555-5555"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      case 2:
        return renderServiceStep();
      case 3:
        return renderMessageStep();
      default:
        return null;
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl w-full max-w-md mx-auto shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Get Your Free Quote</h2>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-4 h-[60vh] overflow-y-auto">
              {showSuccess ? (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <Check className="h-5 w-5 mr-2" />
                  <AlertDescription>
                    Quote request submitted successfully!
                  </AlertDescription>
                </Alert>
              ) : (
                renderStep()
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="w-24"
                >
                  Back
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="w-24 ml-auto"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-24 ml-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default QuoteModal;
