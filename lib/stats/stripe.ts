"use server";

import { StripeData } from "@/lib/types/stats";

export async function getStripeStats(): Promise<StripeData> {
  return {
    type: "stripe",
    name: "Stripe",
    category: "business",
    logo: "https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg?q=80&w=1082",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    revenueThisMonth: 0,
    totalCustomers: 0,
    successfulPayments: 0,
    avgTransactionValue: 0,
    revenueHistory: [],
    error: "Coming Soon",
  };
}
