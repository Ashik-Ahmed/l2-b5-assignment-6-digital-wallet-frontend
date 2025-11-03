import { ArrowRight, Wallet, Send, Banknote, ShieldCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { JSX } from "react";

interface Feature {
    id: string;
    heading: string;
    description: string;
    icon: JSX.Element;
    image: string;
    url?: string;
}

interface FeatureProps {
    title?: string;
    description?: string;
    buttonUrl?: string;
    buttonText?: string;
    features?: Feature[];
}

const Features = ({
    title = "Powerful Features for a Smarter Digital Wallet",
    description = "Experience the freedom of seamless transactions, instant transfers, and secure money management — all from your digital wallet.",
    buttonUrl = "/login",
    buttonText = "Get Started",
    features = [
        {
            id: "feature-1",
            heading: "Deposit Money Instantly",
            description:
                "Add funds to your wallet from bank accounts, cards, or agents with a few taps. Your balance updates instantly, ready to use anytime.",
            icon: <Banknote className="h-10 w-10 text-primary" />,
            image: "https://images.unsplash.com/photo-1683028866998-dd7aed8c4980?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        },
        {
            id: "feature-2",
            heading: "Withdraw to Bank or Cash Agent",
            description:
                "Easily withdraw funds to your bank account or nearby cash agents. Withdrawals are fast, safe, and available 24/7.",
            icon: <Wallet className="h-10 w-10 text-primary" />,
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
        },
        {
            id: "feature-3",
            heading: "Send Money Instantly",
            description:
                "Transfer money instantly to friends, family, or other wallet users — no delays, no hidden fees, and real-time notifications.",
            icon: <Send className="h-10 w-10 text-primary" />,
            image: "https://plus.unsplash.com/premium_photo-1681760172620-98a67f93b08a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        },
        {
            id: "feature-4",
            heading: "Keep Your Money Safe Digitally",
            description:
                "Your funds are protected by bank-grade encryption and multi-layer authentication, ensuring your security is never compromised.",
            icon: <ShieldCheck className="h-10 w-10 text-primary" />,
            image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200",
        },
        {
            id: "feature-5",
            heading: "Smart Spending Insights",
            description:
                "Track expenses, analyze transactions, and get spending insights so you can make smarter financial decisions.",
            icon: <BarChart3 className="h-10 w-10 text-primary" />,
            image: "https://plus.unsplash.com/premium_photo-1728032143228-960e169ab3a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1400",
        },
    ],
}: FeatureProps) => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto space-y-16">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-semibold tracking-tight mb-4">{title}</h2>
                    {description && (
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            {description}
                        </p>
                    )}
                    {buttonUrl && (
                        <Button asChild>
                            <Link
                                to={buttonUrl}
                                className="group inline-flex items-center font-medium"
                            >
                                {buttonText}
                                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.heading}
                                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>

                            <div className="flex flex-col gap-4 px-6 py-8 md:px-8 lg:px-10">
                                <div className="flex items-center gap-4">
                                    {feature.icon}
                                    <h3 className="text-xl font-semibold leading-tight">
                                        {feature.heading}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
