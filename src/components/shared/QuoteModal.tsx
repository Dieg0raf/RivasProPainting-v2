"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight, X, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SERVICES = [
  // Interior Services
  { id: "interior_painting", label: "Interior Painting" },
  { id: "cabinet_painting", label: "Cabinet Painting" },
  { id: "drywall", label: "Drywall & Plaster Repair" },
  { id: "trim_painting", label: "Trim & Baseboards" },
  { id: "crown_molding", label: "Crown Molding Installation" },

  // Exterior Services
  { id: "exterior_painting", label: "Exterior Painting" },
  { id: "staining", label: "Staining & Varnishing" },
  { id: "stucco", label: "Stucco Repair & Painting" },
  { id: "siding", label: "Siding Repair" },
  { id: "power_washing", label: "Power Washing" },

  // Interior Service
  { id: "wallpaper", label: "Wallpaper Removal & Installation" },
];

// Form schema remains the same
const formSchema = z.object({
  first_name: z.string().min(2, "Name must be at least 2 characters"),
  last_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Please provide more details about your project"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
});

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    modalElement.addEventListener("keydown", handleTab);
    firstFocusable.focus();

    return () => {
      modalElement.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

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

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (!data.error) {
        setShowSuccess(true);
        // Scroll to the success message
        setTimeout(() => {
          const successAlert = document.getElementById("success-alert");
          if (successAlert) {
            successAlert.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
        // Increased timeout for better visibility
        setTimeout(() => {
          onClose();
          form.reset();
        }, 2000);
      } else {
        console.error("Quote request failed to submit. Please try again later");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white text-black rounded-xl max-w-md w-full mx-auto shadow-xl my-4 relative">
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="p-6 space-y-6 relative">
            <div className="flex justify-between items-center sticky top-0 bg-white p z-10">
              <h2 className="text-2xl font-semibold">Get Your Free Quote</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col">
                          <FormLabel className="text-left mb-2">
                            First Name <Asterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" required {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col">
                          <FormLabel className="text-left mb-2">
                            Last Name <Asterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" required {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col">
                        <FormLabel className="text-left mb-2">
                          Email <Asterisk />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            required
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col">
                        <FormLabel className="text-left mb-2">
                          Phone Number <Asterisk />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 555-5555"
                            type="tel"
                            required
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <div className="flex flex-col">
                        <FormLabel className="text-left mb-2">
                          Services Required <Asterisk />
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {SERVICES.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          service.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                service.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== service.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col">
                        <FormLabel className="text-left mb-2">
                          Project Details <Asterisk />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[100px]"
                            required
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Success Alert moved just above the submit button */}
                {showSuccess && (
                  <div id="success-alert" className="py-2">
                    <Alert className="bg-green-50 border-green-200 text-green-800 flex items-center justify-center p-4">
                      <Check className="h-5 w-5 mr-2" />
                      <AlertDescription className="text-base">
                        Quote request submitted successfully!
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-red hover:bg-red-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Asterisk() {
  return <span className="text-primary-red">*</span>;
}
