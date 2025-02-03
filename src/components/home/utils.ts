
export interface Service {
    title: string;
    description: string;
    image: string;
}

export const interiorServices: Service[] = [
    {
        title: "Interior Painting & Paint Removal",
        description: "Convert your space with a fresh coat of paint. Our team removes old paint and applies new colors with precision, ensuring long-lasting results you'll love.",
        image: "/images/home-page/interior-card-image.jpg"
    },
    {
        title: "Cabinet Painting",
        description: "Want a new kitchen without the huge cost? Our cabinet painting service saves you thousands while delivering that modern look you've been dreaming of.",
        image: "/images/home-page/cabinet-card-image.jpg"
    },
    {
        title: "Drywall and Plaster Repair",
        description: "Professional drywall repair and restoration. We fix damage of any size and restore your walls to pristine condition, ready for a flawless paint application.",
        image: "/images/home-page/drywall-card-image.jpg"
    },
    {
        title: "Wallpaper Removal & Installation",
        description: "Time for something new? Let us handle your wallpaper needs - from careful removal of old paper to perfect installation of your chosen patterns.",
        image: "/images/home-page/wallpaper-card-image.jpeg"
    },
    {
        title: "Trim & Baseboards",
        description: "The details make the difference. Our precise trim and baseboard painting adds that finishing touch that makes your whole room shine.",
        image: "/images/home-page/baseboard-card-image-2.jpg"
    },
    {
        title: "Crown Molding Installation",
        description: "Add timeless elegance to any room. Our expert installation and painting of crown molding brings that extra touch of sophistication to your space.",
        image: "/images/home-page/crownmolding-card-image.jpg"
    }
];

export const exteriorServices: Service[] = [
    {
        title: "Exterior Painting",
        description: "Our expert painters handle all outdoor surfaces - from stucco and wood to vinyl and brick. Your home will look fresh and protected.",
        image: "/images/home-page/residential-exterior-painting.jpg"
    },
    {
        title: "Staining & Varnishing",
        description: "Let our craftsmen bring out the natural beauty of your wood. Our premium stains and varnishes protect your deck, fence, or siding for years.",
        image: "/images/home-page/staining-card-image.jpg"
    },
    {
        title: "Stucco Repairs & Painting",
        description: "Trust your stucco repairs to our skilled team. From fixing cracks to applying fresh paint, your walls will look as good as new.",
        image: "/images/home-page/stucco-card-image.jpg"
    },
    {
        title: "Siding Repairs",
        description: "Our specialists repair damaged siding to protect your home and boost its curb appeal. Count on lasting results from day one.",
        image: "/images/home-page/siding-card-image-2.jpg"
    },
    {
        title: "Power Washing",
        description: "Your surfaces deserve a deep clean. Our power washing team removes years of dirt and grime, preparing your home for a fresh coat of paint.",
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