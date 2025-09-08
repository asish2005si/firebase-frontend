
export type CardInfo = {
    value: string;
    title: string;
    description: string;
    fees: string;
    benefits: string[];
};

export const debitCardTypes: CardInfo[] = [
    {
        value: "classic-debit",
        title: "Classic Debit Card",
        description: "Your everyday card for simple and secure transactions.",
        fees: "Annual Fee: ₹150 + GST",
        benefits: [
            "Daily Cash Withdrawal Limit: ₹25,000",
            "Daily Purchase Limit: ₹1,00,000",
            "Accepted worldwide",
        ]
    },
    {
        value: "platinum-debit",
        title: "Platinum Debit Card",
        description: "Enhanced limits and complimentary benefits for your lifestyle.",
        fees: "Annual Fee: ₹750 + GST",
        benefits: [
            "Daily Cash Withdrawal Limit: ₹1,00,000",
            "Daily Purchase Limit: ₹5,00,000",
            "Complimentary airport lounge access (2 per quarter)",
            "Higher insurance coverage",
        ]
    },
    {
        value: "travel-debit",
        title: "Travel Debit Card",
        description: "The perfect companion for your international travels.",
        fees: "Annual Fee: ₹500 + GST",
        benefits: [
            "Zero cross-currency markup fee",
            "Special discounts on hotel and flight bookings",
            "Global ATM access with lower fees",
        ]
    },
];

export const creditCardTypes: CardInfo[] = [
    {
        value: "silver-credit",
        title: "Silver Credit Card",
        description: "Begin your credit journey with rewarding experiences.",
        fees: "Joining Fee: ₹500 | Annual Fee: ₹500 (waived on ₹50k spend)",
        benefits: [
            "2 Reward Points per ₹150 spent",
            "Fuel surcharge waiver up to ₹100/month",
            "Contactless payments enabled",
        ]
    },
    {
        value: "gold-credit",
        title: "Gold Credit Card",
        description: "Unlock premium benefits and higher reward points.",
        fees: "Joining Fee: ₹1000 | Annual Fee: ₹1000 (waived on ₹1L spend)",
        benefits: [
            "5 Reward Points per ₹150 on dining & groceries",
            "Complimentary movie ticket every month",
            "Revolving credit at attractive interest rates",
        ]
    },
    {
        value: "platinum-credit",
        title: "Platinum Credit Card",
        description: "Experience luxury with our most premium card offering.",
        fees: "Joining Fee: ₹2500 | Annual Fee: ₹2500 (waived on ₹4L spend)",
        benefits: [
            "10 Reward Points per ₹150 spent",
            "Unlimited airport lounge access (domestic & international)",
            "Dedicated concierge service",
            "Exclusive golf privileges",
        ]
    },
];
