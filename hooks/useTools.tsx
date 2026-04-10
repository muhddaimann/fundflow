import { useMemo, useState } from "react";

export default function useTools() {
  // Loan
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  // Savings
  const [monthlyDeposit, setSavingsDeposit] = useState("");
  const [savingsRate, setSavingsRate] = useState("");
  const [savingsYears, setSavingsYears] = useState("");

  // Compound (NEW)
  const [lumpSum, setLumpSum] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [compoundRate, setCompoundRate] = useState("");
  const [compoundYears, setCompoundYears] = useState("");

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

    const monthlyPayment =
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

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

    const futureValue = p * ((Math.pow(1 + r, n) - 1) / r);
    const totalDeposits = p * n;
    const totalInterest = futureValue - totalDeposits;

    return {
      futureValue: formatCurrency(futureValue),
      totalDeposits: formatCurrency(totalDeposits),
      interest: formatCurrency(totalInterest),
    };
  }, [monthlyDeposit, savingsRate, savingsYears]);

  const compoundResult = useMemo(() => {
    const P = parseFloat(lumpSum);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(compoundRate) / 100 / 12;
    const n = parseFloat(compoundYears) * 12;

    if (isNaN(r) || isNaN(n) || n === 0) return null;

    const lumpFuture = isNaN(P) ? 0 : P * Math.pow(1 + r, n);

    const monthlyFuture = isNaN(PMT)
      ? 0
      : PMT * ((Math.pow(1 + r, n) - 1) / r);

    const total = lumpFuture + monthlyFuture;

    const totalContributions =
      (isNaN(P) ? 0 : P) + (isNaN(PMT) ? 0 : PMT * n);

    const totalInterest = total - totalContributions;

    return {
      total: formatCurrency(total),
      contributions: formatCurrency(totalContributions),
      interest: formatCurrency(totalInterest),
    };
  }, [lumpSum, monthlyContribution, compoundRate, compoundYears]);

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
    compound: {
      lumpSum,
      setLumpSum,
      monthlyContribution,
      setMonthlyContribution,
      rate: compoundRate,
      setRate: setCompoundRate,
      years: compoundYears,
      setYears: setCompoundYears,
      result: compoundResult,
    },
    formatCurrency,
  };
}