import { useMemo } from "react";

export default function useClaim() {
  const currency = "RM";

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const claimData = useMemo(
    () => ({
      totalToClaim: 120.0,
      recentClaims: [
        { id: "1", title: "Travel Claim", amount: 45.0, status: "pending" },
        { id: "2", title: "Food Claim", amount: 75.0, status: "approved" },
      ],
    }),
    []
  );

  return {
    claimData,
    formatCurrency,
  };
}
