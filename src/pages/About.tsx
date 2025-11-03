import { Button } from "@/components/ui/button";
import { Shield, Target, Users } from "lucide-react";

interface AboutProps {
    title?: string;
    description?: string;
    mainImage?: { src: string; alt: string };
    secondaryImage?: { src: string; alt: string };
    breakout?: {
        src: string;
        alt: string;
        title?: string;
        description?: string;
        buttonText?: string;
        buttonUrl?: string;
    };
    companiesTitle?: string;
    companies?: Array<{ src: string; alt: string }>;
    achievementsTitle?: string;
    achievementsDescription?: string;
    achievements?: Array<{ label: string; value: string }>;
}

const defaultCompanies = [
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg", alt: "Arc" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg", alt: "Descript" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg", alt: "Mercury" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg", alt: "Ramp" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg", alt: "Retool" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg", alt: "Watershed" },
];

const defaultAchievements = [
    { label: "Monthly Transactions", value: "200M+" },
    { label: "Satisfied Users", value: "1M+" },
    { label: "Customer Satisfaction", value: "99%" },
    { label: "Active Users", value: "800K+" },
];

const defaultTeam = [
    { name: "Ashik Ahmed", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Rina Rahman", role: "Chief Technology Officer", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Tanvir Hasan", role: "Head of Operations", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Maya Islam", role: "Product Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
];

const About = ({
    title = "About Us",
    description = "We’re redefining financial inclusion through secure and effortless digital wallet solutions, empowering individuals and businesses to manage their money with confidence.",
    mainImage = {
        src: "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1528",
        alt: "Digital wallet app",
    },
    secondaryImage = {
        src: "https://images.unsplash.com/photo-1758518726609-c551f858cd5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031",
        alt: "Finance team collaboration",
    },
    breakout = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
        alt: "Innovation",
        title: "Empowering the future of digital finance",
        description: "We aim to build a cashless ecosystem where financial transactions are secure, instant, and inclusive.",
        buttonText: "Learn More",
        buttonUrl: "#",
    },
    companiesTitle = "Trusted by leading companies worldwide",
    companies = defaultCompanies,
    achievementsTitle = "Our Achievements in Numbers",
    achievementsDescription = "Delivering exceptional performance and impact across digital finance.",
    achievements = defaultAchievements,
}: AboutProps = {}) => {
    return (
        <section className="py-32 bg-background">
            <div className="container space-y-28">
                {/* --- Hero / Intro --- */}
                <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
                    <h1 className="text-5xl font-semibold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* --- Service Story --- */}
                <div className="grid gap-10 lg:grid-cols-3">
                    <img
                        src={mainImage.src}
                        alt={mainImage.alt}
                        className="rounded-xl object-cover w-full max-h-[620px] lg:col-span-2"
                    />
                    <div className="flex flex-col gap-6 justify-center">
                        <h2 className="text-3xl font-semibold">Our Story</h2>
                        <p className="text-muted-foreground">
                            Founded with a mission to simplify financial access, we’ve built a
                            platform that connects millions through instant payments, seamless
                            transfers, and transparent transactions.
                        </p>
                        <p className="text-muted-foreground">
                            Over the years, our digital wallet has evolved into a trusted
                            financial partner—secure, user-friendly, and scalable for both
                            individuals and enterprises.
                        </p>
                    </div>
                </div>

                {/* --- Mission & Vision --- */}
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="rounded-xl border bg-muted/40 p-8 shadow-sm hover:shadow-md transition">
                        <Shield className="mx-auto md:mx-0 mb-4 h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-muted-foreground">
                            To ensure secure, seamless, and inclusive financial services that
                            empower every user to manage money with freedom and trust.
                        </p>
                    </div>
                    <div className="rounded-xl border bg-muted/40 p-8 shadow-sm hover:shadow-md transition">
                        <Target className="mx-auto md:mx-0 mb-4 h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-muted-foreground">
                            To lead the transformation toward a cashless economy through
                            innovation, transparency, and technological excellence.
                        </p>
                    </div>
                    <div className="rounded-xl border bg-muted/40 p-8 shadow-sm hover:shadow-md transition">
                        <Users className="mx-auto md:mx-0 mb-4 h-10 w-10 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                        <p className="text-muted-foreground">
                            Integrity, innovation, and inclusivity guide every step of our
                            journey to build better financial futures.
                        </p>
                    </div>
                </div>

                {/* --- Breakout & Secondary Image --- */}
                <div className="grid gap-7 lg:grid-cols-3">
                    <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-8">
                        <img src={breakout.src} alt={breakout.alt} className="h-10" />
                        <div>
                            <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                            <p className="text-muted-foreground">{breakout.description}</p>
                        </div>
                        <Button variant="outline" className="mr-auto" asChild>
                            <a href={breakout.buttonUrl} target="_blank" rel="noopener noreferrer">
                                {breakout.buttonText}
                            </a>
                        </Button>
                    </div>
                    <img
                        src={secondaryImage.src}
                        alt={secondaryImage.alt}
                        className="rounded-xl object-cover lg:col-span-2"
                    />
                </div>

                {/* --- Trusted Companies --- */}
                <div className="text-center">
                    <p className="text-muted-foreground">{companiesTitle}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-10 opacity-80">
                        {companies.map((company, idx) => (
                            <img
                                key={idx}
                                src={company.src}
                                alt={company.alt}
                                className="h-6 md:h-8 w-auto grayscale hover:grayscale-0 transition"
                            />
                        ))}
                    </div>
                </div>

                {/* --- Achievements --- */}
                <div className="bg-muted relative overflow-hidden rounded-xl p-10 md:p-16">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
                        <p className="text-muted-foreground max-w-xl">
                            {achievementsDescription}
                        </p>
                    </div>
                    <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
                        {achievements.map((item, idx) => (
                            <div className="flex flex-col gap-3" key={idx}>
                                <p className="text-muted-foreground">{item.label}</p>
                                <span className="text-4xl font-semibold md:text-5xl">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
                </div>

                {/* --- Team Section --- */}
                <div className="text-center">
                    <h2 className="text-4xl font-semibold mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                        The passionate people driving innovation, growth, and user trust at
                        every level.
                    </p>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                        {defaultTeam.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="h-28 w-28 rounded-full object-cover shadow-md"
                                />
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
