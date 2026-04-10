import { useMemo, useState } from "react";

export default function useTools() {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  // Savings Calculator State
  const [monthlyDeposit, setSavingsDeposit] = useState("");
  const [savingsRate, setSavingsRate] = useState("");
  const [savingsYears, setSavingsYears] = useState("");

  const formatCurrency = (amount: number) => {
    return `RM${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const loanResult = useMemo(() => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) return null;

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    return {
      monthly: formatCurrency(monthlyPayment),
      total: formatCurrency(totalPayment),
      interest: formatCurrency(totalInterest),
    };
  }, [loanAmount, interestRate, loanTerm]);

  const savingsResult = useMemo(() => {
    const p = parseFloat(monthlyDeposit);
    const r = parseFloat(savingsRate) / 100 / 12;
    const n = parseFloat(savingsYears) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) return null;

    // Formula for Future Value of Ordinary Annuity
    const futureValue = p * ((Math.pow(1 + r, n) - 1) / r);
    const totalDeposits = p * n;
    const totalInterest = futureValue - totalDeposits;

    return {
      futureValue: formatCurrency(futureValue),
      totalDeposits: formatCurrency(totalDeposits),
      interest: formatCurrency(totalInterest),
    };
  }, [monthlyDeposit, savingsRate, savingsYears]);

  return {
    loan: {
      amount: loanAmount,
      setAmount: setLoanAmount,
      rate: interestRate,
      setRate: setInterestRate,
      term: loanTerm,
      setTerm: setLoanTerm,
      result: loanResult,
    },
    savings: {
      deposit: monthlyDeposit,
      setDeposit: setSavingsDeposit,
      rate: savingsRate,
      setRate: setSavingsRate,
      years: savingsYears,
      setYears: setSavingsYears,
      result: savingsResult,
    },
    formatCurrency,
  };
}
