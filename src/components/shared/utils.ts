import { z } from "zod";

export const SERVICES = [
    // Interior Services
    { id: "interior_painting", label: "Interior Painting", category: "Interior" },
    { id: "cabinet_painting", label: "Cabinet Painting", category: "Interior" },
    { id: "drywall", label: "Drywall & Plaster Repair", category: "Interior" },
    { id: "trim_painting", label: "Trim & Baseboards", category: "Interior" },
    {
        id: "crown_molding",
        label: "Crown Molding Installation",
        category: "Interior",
    },
    {
        id: "wallpaper",
        label: "Wallpaper Removal & Installation",
        category: "Interior",
    },

    // Exterior Services
    { id: "exterior_painting", label: "Exterior Painting", category: "Exterior" },
    { id: "staining", label: "Staining & Varnishing", category: "Exterior" },
    { id: "stucco", label: "Stucco Repair & Painting", category: "Exterior" },
    { id: "siding", label: "Siding Repair", category: "Exterior" },
    { id: "power_washing", label: "Power Washing", category: "Exterior" },
];

export const formSchema = z.object({
    first_name: z.string().min(2, "Name must be at least 2 characters"),
    last_name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(10, "Please provide more details about your project"),
    services: z.array(z.string()).min(1, "Please select at least one service"),
});