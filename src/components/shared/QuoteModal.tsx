// import HeadlineText from "./HeadlineText";
// // components/shared/QuoteModal.tsx
// interface QuoteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             {/* <h2 className="text-xl font-bold">Get Your Free Quote</h2> */}
//             <HeadlineText
//               text="Get Your Free Quote"
//               headingType="h2"
//               colorType="black"
//             />
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//           </div>
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full p-2 border rounded"
//             />
//             <textarea
//               placeholder="Project Details"
//               rows={4}
//               className="w-full p-2 border rounded"
//             />
//             <button
//               type="submit"
//               className="w-full bg-primary-red text-white py-2 rounded hover:bg-red-700"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeadlineText from "@/components/shared/HeadlineText";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  details: z.string().min(10, "Please provide more details about your project"),
});

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full mx-auto shadow-xl">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <HeadlineText
              text="Get Your Free Quote"
              headingType="h2"
              colorType="black"
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600">
            Fill out the form below and we&apos;ll get back to you within 24
            hours with a free estimate.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        type="email"
                        {...field}
                      />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 555-5555"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project (size, type of work, timeline, etc.)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-red hover:bg-red-700"
                >
                  Submit Quote Request
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
