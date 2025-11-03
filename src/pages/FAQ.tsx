import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqProps {
    heading?: string;
    items?: FaqItem[];
}

const Faq = ({
    heading = "Frequently asked questions",
    items = [
        {
            id: "faq-1",
            question: "What is a digital wallet?",
            answer: "A digital wallet is a secure app that allows you to store money, make payments, transfer funds, and manage your finances digitally without the need for physical cash.",
        },
        {
            id: "faq-2",
            question: "How do I add money to my wallet?",
            answer: "You can easily add money to your wallet by visiting an authorized agent or receiving money from another wallet user. The funds will reflect instantly in your wallet balance.",
        },
        {
            id: "faq-3",
            question: "Can I send money to other users?",
            answer: "Yes. You can instantly send money to any other wallet user by entering their phone number. The transaction is processed in real time.",
        },
        {
            id: "faq-4",
            question: "Is my money safe in the digital wallet?",
            answer: "Absolutely. Your money and data are protected with bank-grade encryption, secure authentication, and real-time fraud monitoring to ensure complete safety.",
        },
        {
            id: "faq-5",
            question: "How do I withdraw money from my wallet?",
            answer: "You can withdraw money through nearby cash-out agents. The process is simple and available 24/7.",
        },
        {
            id: "faq-6",
            question: "Are there any transaction limits?",
            answer: "Yes, daily and monthly transaction limits may apply depending on your account type and verification level. You can view or increase your limits in the app settings.",
        },
        {
            id: "faq-7",
            question: "What should I do if a transaction fails?",
            answer: "If a transaction fails but the amount is deducted, it will automatically be refunded to your wallet or bank account within a few business days. You can also contact support for assistance.",
        },
        {
            id: "faq-8",
            question: "Can I use my wallet for bill payments and mobile recharge?",
            answer: "Yes, you can easily pay utility bills, recharge your mobile, and make other digital payments directly from your wallet in just a few taps.",
        },
        {
            id: "faq-9",
            question: "Is there a fee for transactions?",
            answer: "Yes, there is a small transaction fee for each transaction. You can view the fee details in the app settings.",
        },
        {
            id: "faq-10",
            question: "How do I contact customer support?",
            answer: "You can reach our support team through the in-app chat, email, or by calling our 24/7 helpline. Visit the 'Contact' section in our website for details.",
        },
    ]
}: FaqProps) => {
    return (
        <section className="py-16">
            <div className="container max-w-3xl mx-auto">
                <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
                    {heading}
                </h1>
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-semibold hover:no-underline cursor-pointer">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default Faq;