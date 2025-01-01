
export interface Service {
    title: string;
    description: string;
    image: string;
}

export const interiorServices: Service[] = [
    {
        title: "Interior Painting & Paint Removal",
        description: "Professional interior painting and paint removal services for homes and commercial spaces. Expert surface preparation and premium paint application for flawless results.",
        image: "/images/home-page/cabinet-card-image.jpg"
    },
    {
        title: "Cabinet Painting",
        description: "Transform outdated cabinets with our expert painting services. Meticulous preparation and quality finishes for a durable, modern look.",
        image: "/images/home-page/cabinet-card-image.jpg"
    },
    {
        title: "Dry Wall & Plaster",
        description: "Expert drywall repair and plastering services. Creating smooth, flawless surfaces for your interior spaces.",
        image: "/images/home-page/drywall-card-image.jpg"
    },
    {
        title: "Wallpaper Removal & Installation",
        description: "Professional wallpaper removal and installation with attention to detail. Create your perfect space with our expert wallpaper services.",
        image: "/images/home-page/wallpaper-card-image.jpeg"
    },
    {
        title: "Trim & Baseboard Painting",
        description: "Precise trim and baseboard painting to enhance your interior details. Quality finishes that protect and beautify your architectural elements.",
        image: "/images/home-page/baseboard-card-image.webp"
    },
    {
        title: "Crown/Trim Molding & Installation",
        description: "Expert crown and trim molding installation to elevate your space. Bringing sophistication to your interiors with precise craftsmanship.",
        image: "/images/home-page/crownmolding-card-image.jpg"
    }
];

export const exteriorServices: Service[] = [
    {
        title: "Exterior Painting",
        description: "Professional exterior painting services for all surfaces including stucco, wood, vinyl, aluminum siding, brick, and cedar shingles.",
        image: "/images/home-page/residential-exterior-painting.jpg"
    },
    {
        title: "Staining & Varnishing",
        description: "Expert wood staining and varnishing services to enhance and protect your exterior wood surfaces with premium finishes.",
        image: "/images/home-page/staining-card-image.jpg"
    },
    {
        title: "Stucco Repairs & Painting",
        description: "Professional stucco repair and painting services. Seamlessly blend restoration and aesthetics for a durable finish.",
        image: "/images/home-page/stucco-card-image.jpg"
    },
    {
        title: "Siding Repairs",
        description: "Expert siding repair and restoration services. Enhance your property's structural integrity and curb appeal.",
        image: "/images/home-page/siding-card-image.jpeg"
    },
    {
        title: "Power Washing",
        description: "Professional power washing to remove mildew, oil, and old paint, ensuring optimal surface preparation for painting.",
        image: "/images/home-page/powerwashing-card-image.jpg"
    }
];

export interface Review {
    id: number;
    name: string;
    review: string;
    rating: number;
    area: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        name: "James C.",
        review:
            "Enrique and his staff did an outstanding job in painting the exterior of our house. Enrique also has very good concept of choosing the right color of paint for our house. Will definitely ask him again if we decides to paint the interior of our house. Thanks Enrique. Job well done.",
        rating: 5,
        area: "San Francisco, CA",
    },
    {
        id: 2,
        name: "Hoda A.",
        review:
            "I hired them to repaint my kitchen cabinets. I chose the wrong color, and they made time to return a couple of days later to redo the cabinets. They changed the hinges and door knobs for me. Very pleased, and the extra fee for returning was reasonable. I worked with Enrique before and found him to be conscientious and responsive. Highly recommend",
        rating: 5,
        area: "Walnut Creek, CA",
    },
    {
        id: 3,
        name: "Susan M.",
        review:
            "I have used Enrique for many years. He is honest, reliable and has always done exceptional work.",
        rating: 5,
        area: "Alamo, CA",
    },
    {
        id: 4,
        name: "Karen G.",
        review:
            "Enrique has done work for us for years. The quality of his work is top notch. All of his crew are excellent. He has done big jobs that require framing and building walls and painting large areas, and also smaller jobs. He can really do anything - and he always does it well. I do not hesitate in giving him the highest rating and referring him to others.",
        rating: 5,
        area: "Lafayette, CA",
    },
    {
        id: 5,
        name: "Lorena M.",
        review:
            "Enrique and his team did a fantastic job painting our iron gates around our house. Prepping, sanding, priming and painting iron gates is not an easy task. His team came on time and worked diligently until the job was done.",
        rating: 5,
        area: "Danville, CA",
    },
    {
        id: 6,
        name: "Desiree G.",
        review:
            "Enrique and his team have done several painting jobs at our house. He has done complete indoor and outdoor painting, including some siding replacement/repairs. He is such a pleasure to deal with, as is his courteous team. He is also great at offering his educated opinion and recommendations when the occasion arises.",
        rating: 5,
        area: "San Francisco Bay Area, CA",
    },
];