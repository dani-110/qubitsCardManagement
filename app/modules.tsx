"use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Ban, BarChart3, Blocks, BookOpen, CheckCircle2,
  ChevronDown, CircleDollarSign, Clock3, CreditCard, Download, Eye, FileCheck2,
  FileText, Fingerprint, Gauge, HelpCircle, KeyRound, LockKeyhole, MoreHorizontal, Network,
  Building2, CalendarClock, CarFront, Fuel, Gift, Mail, PackageCheck, Plus, QrCode, RefreshCw, Repeat2, Route, Search, Send, Settings, ShieldAlert,
  ShieldCheck, SlidersHorizontal, Smartphone, Sparkles, Upload, UserCheck, UsersRound,
  ShoppingBag, Store, TicketCheck, WalletCards, Wifi, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type Row = Record<string, string>;

type ModuleConfig = {
  description: string;
  primary: string;
  metrics: Array<{ label: string; value: string; detail: string; tone?: string }>;
  columns: Array<{ key: string; label: string }>;
  rows: Row[];
  filters: string[];
};

const modules: Record<string, ModuleConfig> = {
  Cards: {
    description: "Issue, activate and manage physical and virtual cards across every lifecycle state.",
    primary: "Issue card",
    metrics: [
      { label: "Total portfolio", value: "24,862", detail: "+8.2% this month" },
      { label: "Awaiting activation", value: "486", detail: "112 older than 7 days", tone: "amber" },
      { label: "Virtual cards", value: "8,741", detail: "35.2% of portfolio", tone: "blue" },
      { label: "Expiring in 90 days", value: "1,284", detail: "Renewal batch ready", tone: "purple" },
    ],
    columns: [
      { key: "card", label: "Card" }, { key: "holder", label: "Cardholder" },
      { key: "program", label: "Program" }, { key: "status", label: "Lifecycle status" },
      { key: "expiry", label: "Expiry" }, { key: "channel", label: "Fulfilment" },
    ],
    rows: [
      { card: "4821 •••• 2847", holder: "Ayesha Khan", program: "Platinum Debit", status: "Active", expiry: "08/30", channel: "Courier" },
      { card: "5276 •••• 9012", holder: "Hamza Siddiqui", program: "World Credit", status: "Frozen", expiry: "03/29", channel: "Branch" },
      { card: "4821 •••• 6219", holder: "Zoya Merchant", program: "Business Expense", status: "Active", expiry: "11/31", channel: "Instant virtual" },
      { card: "6275 •••• 1140", holder: "Ali Raza", program: "PayPak Debit", status: "Pending", expiry: "09/31", channel: "Branch" },
      { card: "5276 •••• 4438", holder: "Sara Ahmed", program: "Youth Prepaid", status: "Active", expiry: "01/30", channel: "Courier" },
      { card: "4821 •••• 7781", holder: "Noman Trading", program: "Business Expense", status: "Replaced", expiry: "06/28", channel: "Courier" },
    ],
    filters: ["All cards", "Active", "Pending", "Frozen", "Blocked"],
  },
  Customers: {
    description: "Unified customer profiles, KYC status, relationships and card exposure.",
    primary: "Add customer",
    metrics: [
      { label: "Card customers", value: "19,405", detail: "+642 this month" },
      { label: "KYC refresh due", value: "328", detail: "41 high priority", tone: "amber" },
      { label: "Business customers", value: "1,286", detail: "4,912 linked cards", tone: "blue" },
      { label: "High-risk profiles", value: "74", detail: "0.38% of customers", tone: "red" },
    ],
    columns: [
      { key: "customer", label: "Customer" }, { key: "id", label: "Customer ID" },
      { key: "segment", label: "Segment" }, { key: "kyc", label: "KYC status" },
      { key: "cards", label: "Cards" }, { key: "risk", label: "Risk level" },
    ],
    rows: [
      { customer: "Ayesha Khan", id: "CUS-001842", segment: "Priority", kyc: "Verified", cards: "2", risk: "Low" },
      { customer: "Hamza Siddiqui", id: "CUS-003180", segment: "Mass retail", kyc: "Refresh due", cards: "1", risk: "Medium" },
      { customer: "Zoya Merchant", id: "BUS-000924", segment: "SME", kyc: "Verified", cards: "8", risk: "Low" },
      { customer: "Noman Trading", id: "BUS-001107", segment: "Commercial", kyc: "In review", cards: "14", risk: "High" },
      { customer: "Sara Ahmed", id: "CUS-004418", segment: "Youth", kyc: "Verified", cards: "1", risk: "Low" },
    ],
    filters: ["All customers", "Retail", "Business", "KYC due", "High risk"],
  },
  Transactions: {
    description: "Real-time authorization activity with response codes, channels and processing outcomes.",
    primary: "Export activity",
    metrics: [
      { label: "Today’s volume", value: "PKR 148.6M", detail: "18,942 transactions" },
      { label: "Approval rate", value: "94.8%", detail: "+0.6% vs yesterday", tone: "green" },
      { label: "Declined", value: "864", detail: "4.6% of attempts", tone: "amber" },
      { label: "Reversals", value: "112", detail: "PKR 3.8M pending", tone: "purple" },
    ],
    columns: [
      { key: "time", label: "Time" }, { key: "rrn", label: "RRN / STAN" },
      { key: "card", label: "Card" }, { key: "merchant", label: "Merchant" },
      { key: "amount", label: "Amount" }, { key: "channel", label: "Channel" },
      { key: "status", label: "Decision" },
    ],
    rows: [
      { time: "14:42:18", rrn: "628194284701 / 482903", card: "•••• 2847", merchant: "Daraz PK", amount: "PKR 18,450", channel: "E-commerce", status: "Approved" },
      { time: "14:41:56", rrn: "628194284612 / 482877", card: "•••• 9012", merchant: "Careem", amount: "PKR 1,280", channel: "Token", status: "Approved" },
      { time: "14:41:09", rrn: "628194284499 / 482811", card: "•••• 6219", merchant: "AWS EMEA", amount: "USD 120.00", channel: "E-commerce", status: "Review" },
      { time: "14:40:44", rrn: "628194284376 / 482796", card: "•••• 1140", merchant: "ATM UBL 0418", amount: "PKR 50,000", channel: "ATM", status: "Declined" },
      { time: "14:39:37", rrn: "628194284198 / 482710", card: "•••• 4438", merchant: "Naheed Store", amount: "PKR 7,850", channel: "POS", status: "Approved" },
    ],
    filters: ["Live feed", "Approved", "Declined", "Reversed", "Under review"],
  },
  "Rewards & Loyalty": {
    description: "Configure card-spend points, cashback, miles, campaigns and redemption rules with full financial control.",
    primary: "Create earning rule",
    metrics: [
      { label: "Active reward rules", value: "18", detail: "Across 9 card programs" },
      { label: "Points issued MTD", value: "84.6M", detail: "PKR 42.3M liability", tone: "blue" },
      { label: "Redemption rate", value: "63.8%", detail: "Points, cashback and miles", tone: "green" },
      { label: "Expiring in 30 days", value: "6.2M", detail: "42,184 customers notified", tone: "amber" },
    ],
    columns: [
      { key: "rule", label: "Earning rule" }, { key: "program", label: "Card program" },
      { key: "model", label: "Reward model" }, { key: "earnRate", label: "Earn rate" },
      { key: "eligibility", label: "Eligible spend" }, { key: "cap", label: "Monthly cap" }, { key: "status", label: "Status" },
    ],
    rows: [
      { rule: "Everyday base points", program: "Platinum Debit", model: "Points", earnRate: "1 point / PKR 100", eligibility: "Eligible retail purchases", cap: "Unlimited", status: "Active" },
      { rule: "International accelerator", program: "World Credit", model: "Points multiplier", earnRate: "3× points", eligibility: "International purchase", cap: "100,000 points", status: "Active" },
      { rule: "Dining cashback", program: "Wallet-linked Virtual", model: "Cashback", earnRate: "5%", eligibility: "Dining MCCs", cap: "PKR 2,500", status: "Active" },
      { rule: "Travel miles", program: "Signature Travel", model: "Airline miles", earnRate: "2 miles / PKR 100", eligibility: "Airline and hotel MCCs", cap: "Unlimited", status: "Active" },
      { rule: "Weekend fuel campaign", program: "Fleet Fuel Prepaid", model: "Bonus points", earnRate: "2× points", eligibility: "MCC 5541/5542 · Sat–Sun", cap: "20,000 points", status: "Scheduled" },
      { rule: "New card welcome bonus", program: "Youth Prepaid", model: "Milestone bonus", earnRate: "5,000 points", eligibility: "PKR 50,000 in first 60 days", cap: "Once per card", status: "Draft" },
    ],
    filters: ["All reward rules", "Active", "Scheduled", "Draft", "Cashback", "Points", "Miles"],
  },
  "Gift Cards": {
    description: "Issue Universal, Category, Occasion and Brand gift cards with scheduled delivery and partial redemption.",
    primary: "Issue gift card",
    metrics: [
      { label: "Outstanding liability", value: "PKR 18.42M", detail: "Across 6,284 active cards" },
      { label: "Issued this month", value: "1,248", detail: "PKR 7.86M loaded", tone: "blue" },
      { label: "Redemption rate", value: "68.4%", detail: "+4.2% vs last month", tone: "green" },
      { label: "Awaiting activation", value: "84", detail: "12 older than 24 hours", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Gift card" }, { key: "recipient", label: "Recipient" },
      { key: "type", label: "Card type" }, { key: "scope", label: "Acceptance scope" }, { key: "balance", label: "Available balance" },
      { key: "delivery", label: "Delivery" }, { key: "expiry", label: "Expiry" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { card: "GK-•••• •••• 8042", recipient: "Hira Ahmed", type: "Universal", scope: "All partner brands", balance: "PKR 8,500", delivery: "Email · Instant", expiry: "31 Aug 2027", status: "Active" },
      { card: "GK-•••• •••• 1198", recipient: "Usman Tariq", type: "Occasion", scope: "Wedding collection", balance: "PKR 25,000", delivery: "Physical", expiry: "15 Sep 2027", status: "Awaiting activation" },
      { card: "GK-•••• •••• 6714", recipient: "Fatima Noor", type: "Category", scope: "Food & dining", balance: "PKR 2,180", delivery: "SMS · Scheduled", expiry: "08 Jul 2027", status: "Active" },
      { card: "GK-•••• •••• 3091", recipient: "TechNova Rewards", type: "Universal", scope: "All partner brands", balance: "PKR 18,500", delivery: "Corporate bulk", expiry: "30 Jun 2027", status: "Partially redeemed" },
      { card: "GK-•••• •••• 4470", recipient: "Sameer Ali", type: "Brand", scope: "Ideas Home", balance: "PKR 0", delivery: "Physical", expiry: "12 May 2027", status: "Redeemed" },
    ],
    filters: ["All gift cards", "Active", "Awaiting activation", "Partially redeemed", "Redeemed"],
  },
  "Merchant Network": {
    description: "Onboard partner brands, branches and online stores with commercial and settlement controls.",
    primary: "Add merchant",
    metrics: [
      { label: "Partner brands", value: "86", detail: "12 categories", tone: "blue" },
      { label: "Active outlets", value: "1,248", detail: "Across 18 cities" },
      { label: "Online enabled", value: "54", detail: "Coupon and API redemption", tone: "green" },
      { label: "Settlement due", value: "PKR 6.28M", detail: "Next cycle: 23 Sep", tone: "amber" },
    ],
    columns: [
      { key: "brand", label: "Brand" }, { key: "category", label: "Category" }, { key: "outlets", label: "Outlets" },
      { key: "channel", label: "Redemption channel" }, { key: "commercial", label: "Commission" },
      { key: "settlement", label: "Settlement" }, { key: "status", label: "Status" },
    ],
    rows: [
      { brand: "Ideas Home", category: "Home & lifestyle", outlets: "42", channel: "POS + Online", commercial: "4.5%", settlement: "T+2", status: "Active" },
      { brand: "Broadway Pizza", category: "Food & dining", outlets: "68", channel: "POS + QR", commercial: "5.0%", settlement: "T+1", status: "Active" },
      { brand: "Sapphire", category: "Fashion", outlets: "38", channel: "POS + Online", commercial: "4.0%", settlement: "Weekly", status: "Active" },
      { brand: "J. Fragrances", category: "Beauty", outlets: "24", channel: "Cashier portal", commercial: "4.2%", settlement: "T+2", status: "Pilot" },
      { brand: "Bookme", category: "Travel & entertainment", outlets: "Online", channel: "Online code", commercial: "3.8%", settlement: "T+1", status: "Active" },
    ],
    filters: ["All merchants", "Active", "Pilot", "POS", "Online"],
  },
  "Corporate Gifting": {
    description: "Create branded bulk campaigns for employees, customers, distributors and loyalty rewards.",
    primary: "Create campaign",
    metrics: [
      { label: "Active campaigns", value: "18", detail: "7 scheduled" },
      { label: "Recipients", value: "8,420", detail: "This quarter", tone: "blue" },
      { label: "Campaign value", value: "PKR 42.8M", detail: "68.2% redeemed", tone: "green" },
      { label: "Pending approval", value: "3", detail: "PKR 7.4M", tone: "amber" },
    ],
    columns: [
      { key: "campaign", label: "Campaign" }, { key: "client", label: "Corporate client" }, { key: "purpose", label: "Purpose" },
      { key: "recipients", label: "Recipients" }, { key: "value", label: "Value" }, { key: "delivery", label: "Delivery" }, { key: "status", label: "Status" },
    ],
    rows: [
      { campaign: "Eid Rewards 2026", client: "TechNova", purpose: "Employee reward", recipients: "1,240", value: "PKR 6.20M", delivery: "Scheduled · Email/SMS", status: "Scheduled" },
      { campaign: "Dealer Champions", client: "Pak Auto Parts", purpose: "Distributor incentive", recipients: "420", value: "PKR 4.20M", delivery: "Physical cards", status: "Active" },
      { campaign: "Welcome Pack", client: "Orbit Bank", purpose: "Customer onboarding", recipients: "2,800", value: "PKR 5.60M", delivery: "Instant digital", status: "Active" },
      { campaign: "Loyalty Surprise", client: "NovaTel", purpose: "Loyalty campaign", recipients: "950", value: "PKR 2.85M", delivery: "Scheduled · SMS", status: "Draft" },
    ],
    filters: ["All campaigns", "Active", "Scheduled", "Draft", "Completed"],
  },
  Redemptions: {
    description: "Authorize in-store, QR and online gift-card redemptions with partial balance and split-tender support.",
    primary: "Process redemption",
    metrics: [
      { label: "Redeemed today", value: "PKR 3.84M", detail: "1,184 redemptions" },
      { label: "Approval rate", value: "97.6%", detail: "+0.8% this week", tone: "green" },
      { label: "Partial redemptions", value: "428", detail: "36.1% of approvals", tone: "blue" },
      { label: "Settlement value", value: "PKR 18.9M", detail: "Next merchant cycle", tone: "amber" },
    ],
    columns: [
      { key: "time", label: "Time" }, { key: "voucher", label: "Voucher" }, { key: "merchant", label: "Merchant" },
      { key: "channel", label: "Channel" }, { key: "amount", label: "Redeemed" }, { key: "remaining", label: "Remaining" }, { key: "status", label: "Decision" },
    ],
    rows: [
      { time: "14:42:18", voucher: "GK-•••• •••• 8042", merchant: "Ideas Home · Clifton", channel: "POS API", amount: "PKR 3,500", remaining: "PKR 5,000", status: "Approved" },
      { time: "14:38:06", voucher: "GK-•••• •••• 6714", merchant: "Broadway Pizza", channel: "QR", amount: "PKR 1,800", remaining: "PKR 380", status: "Approved" },
      { time: "14:31:52", voucher: "GK-•••• •••• 1198", merchant: "Sapphire Online", channel: "Online code", amount: "PKR 12,500", remaining: "PKR 12,500", status: "Approved" },
      { time: "14:24:19", voucher: "GK-•••• •••• 3091", merchant: "Bookme", channel: "Coupon field", amount: "PKR 22,000", remaining: "PKR 18,500", status: "Approved" },
      { time: "14:18:44", voucher: "GK-•••• •••• 4470", merchant: "Unlisted merchant", channel: "Cashier portal", amount: "PKR 5,000", remaining: "PKR 0", status: "Declined" },
    ],
    filters: ["Live redemptions", "Approved", "Declined", "POS", "Online"],
  },
  "Fuel Cards": {
    description: "Issue prepaid fleet cards that authorize only at approved fuel-station merchants.",
    primary: "Issue fuel card",
    metrics: [
      { label: "Active fuel cards", value: "1,846", detail: "Across 214 fleet customers" },
      { label: "Fuel spend MTD", value: "PKR 84.6M", detail: "12,482 approved purchases", tone: "blue" },
      { label: "Average ticket", value: "PKR 6,778", detail: "Petrol and diesel", tone: "green" },
      { label: "Restricted attempts", value: "126", detail: "Non-fuel merchants blocked", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Fuel card" }, { key: "company", label: "Company / driver" },
      { key: "vehicle", label: "Vehicle" }, { key: "fuel", label: "Fuel type" },
      { key: "available", label: "Available limit" }, { key: "lastUse", label: "Last fuel purchase" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { card: "4821 •••• 9017", company: "Metro Logistics · Asad Khan", vehicle: "KHI-4821", fuel: "Diesel", available: "PKR 142,500", lastUse: "PSO Shahrah-e-Faisal", status: "Active" },
      { card: "4821 •••• 1844", company: "Orbit Foods · Noman Ali", vehicle: "KHI-7712", fuel: "Petrol", available: "PKR 68,200", lastUse: "Shell Clifton", status: "Active" },
      { card: "4821 •••• 4478", company: "Qubits Field Team · Pool Car", vehicle: "BJU-309", fuel: "Petrol", available: "PKR 25,000", lastUse: "Awaiting first use", status: "Awaiting activation" },
      { card: "4821 •••• 6205", company: "NorthStar Cargo · Imran Shah", vehicle: "TKA-908", fuel: "Diesel", available: "PKR 0", lastUse: "Attock Highway Station", status: "Limit reached" },
      { card: "4821 •••• 7710", company: "Urban Services · Bilal Ahmed", vehicle: "KHI-3319", fuel: "Petrol & diesel", available: "PKR 91,300", lastUse: "Total PARCO Korangi", status: "Active" },
    ],
    filters: ["All fuel cards", "Active", "Awaiting activation", "Limit reached", "Blocked"],
  },
  "Employee Cards": {
    description: "Manage employer-funded benefit cards with recurring allowances, HR status controls and cost-centre reporting.",
    primary: "Issue employee card",
    metrics: [
      { label: "Active employee cards", value: "3,428", detail: "Across 86 employers" },
      { label: "Allowance available", value: "PKR 126.8M", detail: "Current benefit cycle", tone: "blue" },
      { label: "Utilized this month", value: "71.4%", detail: "PKR 316.2M spend", tone: "green" },
      { label: "HR status holds", value: "28", detail: "Suspended automatically", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Employee card" }, { key: "employee", label: "Employee" },
      { key: "company", label: "Company / cost centre" }, { key: "benefit", label: "Allowance plan" },
      { key: "available", label: "Available" }, { key: "cycle", label: "Allocation cycle" }, { key: "status", label: "Status" },
    ],
    rows: [
      { card: "4821 •••• 3184", employee: "Maha Raza · EMP-1084", company: "TechNova · ENG-01", benefit: "Meal & wellness", available: "PKR 18,400", cycle: "Monthly · Rollover", status: "Active" },
      { card: "4821 •••• 5092", employee: "Saad Ali · EMP-2041", company: "Orbit Foods · SALES-04", benefit: "Travel allowance", available: "PKR 42,500", cycle: "Monthly · Expire", status: "Active" },
      { card: "4821 •••• 7740", employee: "Hina Noor · EMP-0818", company: "NorthStar · OPS-02", benefit: "Flexible benefits", available: "PKR 75,000", cycle: "Quarterly · Rollover", status: "Active" },
      { card: "4821 •••• 1268", employee: "Bilal Ahmed · EMP-0917", company: "Metro Logistics · FLT-01", benefit: "Fuel allowance", available: "PKR 0", cycle: "Monthly · Return", status: "HR hold" },
    ],
    filters: ["All employee cards", "Active", "HR hold", "Monthly", "Fuel allowance"],
  },
  "Expense Cards": {
    description: "Control company spending by employee, department, project or vendor with receipt and ERP reconciliation workflows.",
    primary: "Issue expense card",
    metrics: [
      { label: "Active expense cards", value: "4,912", detail: "1,286 business customers" },
      { label: "Spend this month", value: "PKR 684.2M", detail: "Within approved budgets", tone: "blue" },
      { label: "Receipts matched", value: "92.8%", detail: "18,420 transactions", tone: "green" },
      { label: "Policy exceptions", value: "64", detail: "Manager review required", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Expense card" }, { key: "holder", label: "Holder / purpose" },
      { key: "costCentre", label: "Cost centre" }, { key: "control", label: "Spend control" },
      { key: "budget", label: "Available budget" }, { key: "evidence", label: "Evidence" }, { key: "status", label: "Status" },
    ],
    rows: [
      { card: "4821 •••• 6219", holder: "Zoya Merchant · Department", costCentre: "FIN-100", control: "Business services MCCs", budget: "PKR 1,482,000", evidence: "Receipt required", status: "Active" },
      { card: "VC-EXP-84018", holder: "Adeel Khan · AWS subscription", costCentre: "TECH-210", control: "AWS merchant locked", budget: "USD 2,500", evidence: "Auto-matched invoice", status: "Active" },
      { card: "OT-EXP-84012", holder: "Sana Ahmed · Dubai trip", costCentre: "SALES-410", control: "Travel MCCs · AED", budget: "AED 8,000", evidence: "Trip approval linked", status: "Active" },
      { card: "4821 •••• 7781", holder: "Noman Trading · Procurement", costCentre: "PROC-020", control: "Vendor allowlist", budget: "PKR 320,000", evidence: "2 receipts missing", status: "Review" },
    ],
    filters: ["All expense cards", "Active", "Review", "Virtual", "Receipt missing"],
  },
  "Wallet Cards": {
    description: "Issue physical and virtual cards linked to app-wallet balances with KYC-tier, channel and lifecycle controls.",
    primary: "Issue wallet card",
    metrics: [
      { label: "Active wallet cards", value: "8,741", detail: "76% virtual credentials" },
      { label: "Wallet-funded spend", value: "PKR 242.6M", detail: "This month", tone: "blue" },
      { label: "Instant issuance", value: "98.7%", detail: "Eligible KYC customers", tone: "green" },
      { label: "KYC restrictions", value: "42", detail: "ATM or international blocked", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Wallet card" }, { key: "customer", label: "Customer / wallet" },
      { key: "credential", label: "Credential" }, { key: "channels", label: "Enabled channels" },
      { key: "balance", label: "Wallet balance" }, { key: "kyc", label: "KYC tier" }, { key: "status", label: "Status" },
    ],
    rows: [
      { card: "VC-84920418", customer: "Ayesha Khan · WAL-1842", credential: "Reusable virtual", channels: "POS · E-commerce · Token", balance: "PKR 84,500", kyc: "Enhanced", status: "Active" },
      { card: "4821 •••• 7044", customer: "Hamza Siddiqui · WAL-3180", credential: "Physical + virtual", channels: "POS · ATM · E-commerce", balance: "PKR 31,240", kyc: "Full", status: "Active" },
      { card: "VC-84920111", customer: "Sara Ahmed · WAL-4418", credential: "Virtual", channels: "Domestic POS · E-commerce", balance: "PKR 12,680", kyc: "Basic", status: "Restricted" },
      { card: "4821 •••• 8006", customer: "Ali Raza · WAL-4122", credential: "Physical", channels: "Activation pending", balance: "PKR 48,900", kyc: "Full", status: "Awaiting activation" },
    ],
    filters: ["All wallet cards", "Active", "Restricted", "Virtual", "Physical"],
  },
  "Hybrid Cards": {
    description: "Link debit, credit, wallet, benefit and multi-currency accounts to one physical or virtual credential.",
    primary: "Create hybrid card",
    metrics: [
      { label: "Active hybrid cards", value: "3,284", detail: "2.7 accounts per card" },
      { label: "Funding switches today", value: "8,942", detail: "31% cardholder initiated", tone: "blue" },
      { label: "Auto-routed spend", value: "PKR 42.8M", detail: "Fuel, travel and expense", tone: "green" },
      { label: "Routing exceptions", value: "18", detail: "Awaiting review", tone: "amber" },
    ],
    columns: [
      { key: "card", label: "Hybrid card" }, { key: "holder", label: "Cardholder" }, { key: "accounts", label: "Linked accounts" },
      { key: "default", label: "Default source" }, { key: "routing", label: "Routing mode" }, { key: "currencies", label: "Currencies" }, { key: "status", label: "Status" },
    ],
    rows: [
      { card: "4821 •••• 2847", holder: "Ayesha Khan", accounts: "Debit · Credit · Travel wallet", default: "Primary debit", routing: "Cardholder + automatic", currencies: "PKR · USD · AED", status: "Active" },
      { card: "4821 •••• 6219", holder: "Zoya Merchant", accounts: "Business · Fuel · Expense", default: "Business account", routing: "Policy based", currencies: "PKR · USD", status: "Active" },
      { card: "5276 •••• 4438", holder: "Sara Ahmed", accounts: "Prepaid · Rewards", default: "Prepaid wallet", routing: "Cardholder controlled", currencies: "PKR", status: "Active" },
      { card: "5276 •••• 9012", holder: "Hamza Siddiqui", accounts: "Debit · Credit", default: "Credit line", routing: "Cardholder controlled", currencies: "PKR · GBP", status: "Frozen" },
    ],
    filters: ["All hybrid cards", "Active", "Policy based", "Multi-currency", "Frozen"],
  },
  "Digital Cards": {
    description: "Issue numberless, reusable virtual, one-time and merchant-locked credentials with secure in-app controls.",
    primary: "Issue digital card",
    metrics: [
      { label: "Active digital cards", value: "11,842", detail: "8,741 reusable virtual" },
      { label: "Numberless physical", value: "2,184", detail: "PAN and CVV hidden", tone: "blue" },
      { label: "One-time cards today", value: "1,426", detail: "96.8% completed", tone: "green" },
      { label: "Secure detail views", value: "3,892", detail: "Biometric verified", tone: "purple" },
    ],
    columns: [
      { key: "credential", label: "Credential" }, { key: "holder", label: "Cardholder" }, { key: "type", label: "Digital type" },
      { key: "security", label: "Security" }, { key: "wallets", label: "Wallets" }, { key: "expires", label: "Expiry / use" }, { key: "status", label: "Status" },
    ],
    rows: [
      { credential: "DC-84920184", holder: "Ayesha Khan", type: "Numberless physical", security: "Biometric PAN/CVV", wallets: "Apple · Google", expires: "08/30", status: "Active" },
      { credential: "VC-84919877", holder: "Zoya Merchant", type: "Reusable virtual", security: "Dynamic CVV", wallets: "Google", expires: "11/31", status: "Active" },
      { credential: "OT-84919218", holder: "Sara Ahmed", type: "One-time virtual", security: "Single authorization", wallets: "Not eligible", expires: "1 use · 24h", status: "Unused" },
      { credential: "ML-84918422", holder: "Noman Trading", type: "Merchant locked", security: "AWS Marketplace only", wallets: "Not eligible", expires: "30 days", status: "Active" },
    ],
    filters: ["All digital cards", "Numberless", "Reusable virtual", "One-time", "Merchant locked"],
  },
  "Funding Routing": {
    description: "Route each authorization to the correct linked account using cardholder selection and real-time product policies.",
    primary: "Create routing rule",
    metrics: [
      { label: "Active routing rules", value: "42", detail: "Across 8 hybrid programs" },
      { label: "Auto-route success", value: "99.72%", detail: "Past 24 hours", tone: "green" },
      { label: "Fallback events", value: "284", detail: "0.31% of attempts", tone: "blue" },
      { label: "Routing latency", value: "12 ms", detail: "P95 decision time", tone: "purple" },
    ],
    columns: [
      { key: "rule", label: "Routing rule" }, { key: "trigger", label: "Transaction trigger" }, { key: "source", label: "Funding source" },
      { key: "fallback", label: "Fallback" }, { key: "priority", label: "Priority" }, { key: "status", label: "Status" },
    ],
    rows: [
      { rule: "Fuel benefit first", trigger: "MCC 5541 / 5542", source: "Fuel allowance", fallback: "Primary debit", priority: "10", status: "Active" },
      { rule: "Corporate travel", trigger: "Travel MCC + approved trip", source: "Expense budget", fallback: "Decline", priority: "20", status: "Active" },
      { rule: "Currency match", trigger: "Transaction currency = wallet", source: "Matching FX wallet", fallback: "Primary debit + FX", priority: "30", status: "Active" },
      { rule: "Healthcare benefit", trigger: "Medical / pharmacy MCC", source: "Health allowance", fallback: "Primary debit", priority: "40", status: "Draft" },
    ],
    filters: ["All routing rules", "Active", "Draft", "Allowance", "Multi-currency"],
  },
  "Authorization Data": {
    description: "Inspect enriched real-time authorization attributes, applied controls, funding decisions and network outcomes.",
    primary: "Build data view",
    metrics: [
      { label: "Data attributes", value: "120+", detail: "Per authorization" },
      { label: "Events today", value: "284.9k", detail: "Auth, advice and reversal", tone: "blue" },
      { label: "Decision latency", value: "84 ms", detail: "P95 end-to-end", tone: "green" },
      { label: "Enrichment coverage", value: "99.96%", detail: "Portfolio-wide", tone: "purple" },
    ],
    columns: [
      { key: "time", label: "Time" }, { key: "card", label: "Card / token" }, { key: "merchant", label: "Merchant · MCC" },
      { key: "entry", label: "Entry & authentication" }, { key: "funding", label: "Funding decision" }, { key: "risk", label: "Risk / control" }, { key: "status", label: "Outcome" },
    ],
    rows: [
      { time: "14:42:18.084", card: "Token · •2847", merchant: "Daraz · 5399", entry: "E-commerce · 3DS", funding: "Primary debit · PKR", risk: "18 · Approved", status: "Approved" },
      { time: "14:41:56.071", card: "Apple Pay · •9012", merchant: "Careem · 4121", entry: "Contactless · CDCVM", funding: "Credit line", risk: "12 · Token trusted", status: "Approved" },
      { time: "14:41:09.096", card: "Virtual · •6219", merchant: "AWS · 7372", entry: "Stored credential", funding: "Expense budget", risk: "64 · Review rule", status: "Review" },
      { time: "14:40:44.102", card: "Physical · •1140", merchant: "UBL ATM · 6011", entry: "Chip · Online PIN", funding: "Primary debit", risk: "77 · Geo anomaly", status: "Declined" },
    ],
    filters: ["Live authorizations", "Approved", "Declined", "Tokenized", "Hybrid routed"],
  },
  "Fraud & Risk": {
    description: "Prioritized investigation queue powered by velocity, behavioral and network signals.",
    primary: "Create rule",
    metrics: [
      { label: "Open alerts", value: "12", detail: "4 require action", tone: "red" },
      { label: "Blocked value", value: "PKR 6.9M", detail: "Prevented this month", tone: "green" },
      { label: "False-positive rate", value: "2.4%", detail: "-0.7% this month", tone: "blue" },
      { label: "Average decision", value: "38 sec", detail: "Within 60 sec SLA", tone: "purple" },
    ],
    columns: [
      { key: "case", label: "Alert" }, { key: "customer", label: "Customer" },
      { key: "signal", label: "Primary signal" }, { key: "amount", label: "Exposure" },
      { key: "score", label: "Risk score" }, { key: "status", label: "Queue" },
    ],
    rows: [
      { case: "RSK-2026-01984", customer: "Ayesha Khan", signal: "Rapid merchant velocity", amount: "PKR 184,900", score: "92 / Critical", status: "Investigate" },
      { case: "RSK-2026-01983", customer: "Noman Trading", signal: "Unusual cross-border MCC", amount: "USD 2,440", score: "84 / High", status: "Assigned" },
      { case: "RSK-2026-01981", customer: "Ali Raza", signal: "ATM geo anomaly", amount: "PKR 50,000", score: "77 / High", status: "New" },
      { case: "RSK-2026-01978", customer: "Sara Ahmed", signal: "Device change + e-commerce", amount: "PKR 12,100", score: "66 / Medium", status: "Monitoring" },
      { case: "RSK-2026-01975", customer: "Metro Logistics", signal: "Fuel card used at non-fuel MCC", amount: "PKR 18,400", score: "Rule / Blocked", status: "Closed" },
    ],
    filters: ["Open queue", "Critical", "High", "Assigned", "Closed"],
  },
  Disputes: {
    description: "Manage cardholder claims, chargebacks, evidence and scheme response deadlines.",
    primary: "New dispute",
    metrics: [
      { label: "Open cases", value: "84", detail: "8 need action", tone: "amber" },
      { label: "Disputed value", value: "PKR 4.28M", detail: "Across open cases" },
      { label: "Win rate", value: "71.4%", detail: "+4.1% this quarter", tone: "green" },
      { label: "SLA at risk", value: "6", detail: "Due within 24 hours", tone: "red" },
    ],
    columns: [
      { key: "case", label: "Case" }, { key: "reason", label: "Reason" },
      { key: "card", label: "Cardholder / card" }, { key: "amount", label: "Amount" },
      { key: "deadline", label: "Response due" }, { key: "status", label: "Stage" },
    ],
    rows: [
      { case: "DSP-2026-00184", reason: "Card not present fraud", card: "Ayesha Khan · •2847", amount: "PKR 42,500", deadline: "Today, 17:00", status: "Evidence due" },
      { case: "DSP-2026-00183", reason: "Service not received", card: "Hamza Siddiqui · •9012", amount: "PKR 18,900", deadline: "21 Sep", status: "Representment" },
      { case: "DSP-2026-00179", reason: "Duplicate processing", card: "Sara Ahmed · •4438", amount: "PKR 7,850", deadline: "23 Sep", status: "Merchant response" },
      { case: "DSP-2026-00172", reason: "Cash not received", card: "Ali Raza · •1140", amount: "PKR 20,000", deadline: "24 Sep", status: "Investigation" },
    ],
    filters: ["All cases", "Action due", "First chargeback", "Representment", "Closed"],
  },
  Tokenization: {
    description: "Control network and wallet tokens across Apple Pay, Google Pay and merchant credentials.",
    primary: "Provision token",
    metrics: [
      { label: "Active tokens", value: "9,482", detail: "Across 7,119 cards", tone: "blue" },
      { label: "Wallet tokens", value: "6,284", detail: "66.3% of active tokens" },
      { label: "Provisioning rate", value: "96.1%", detail: "Last 30 days", tone: "green" },
      { label: "Suspended tokens", value: "73", detail: "18 need review", tone: "amber" },
    ],
    columns: [
      { key: "token", label: "Token reference" }, { key: "card", label: "Card" },
      { key: "wallet", label: "Wallet / requestor" }, { key: "device", label: "Device" },
      { key: "assurance", label: "Assurance" }, { key: "status", label: "Status" },
    ],
    rows: [
      { token: "TKN-84920184", card: "•••• 2847", wallet: "Apple Pay", device: "iPhone 17 Pro", assurance: "High · 3DS", status: "Active" },
      { token: "TKN-84919877", card: "•••• 9012", wallet: "Google Pay", device: "Pixel 11", assurance: "High · ID&V", status: "Active" },
      { token: "TKN-84919218", card: "•••• 6219", wallet: "Merchant token", device: "AWS Marketplace", assurance: "Medium", status: "Active" },
      { token: "TKN-84918422", card: "•••• 1140", wallet: "Google Pay", device: "Galaxy S27", assurance: "Low · Review", status: "Suspended" },
    ],
    filters: ["All tokens", "Active", "Suspended", "Apple Pay", "Google Pay"],
  },
  "Card Programs": {
    description: "Configure products, BIN ranges, pricing, controls and eligibility from one workspace.",
    primary: "Create program",
    metrics: [
      { label: "Active programs", value: "14", detail: "9 retail · 5 business" },
      { label: "BIN ranges", value: "22", detail: "Visa, Mastercard, PayPak", tone: "blue" },
      { label: "Cards issued MTD", value: "1,842", detail: "+11.6% vs plan", tone: "green" },
      { label: "Draft changes", value: "7", detail: "3 awaiting approval", tone: "amber" },
    ],
    columns: [
      { key: "program", label: "Program" }, { key: "type", label: "Type" },
      { key: "scheme", label: "Scheme / BIN" }, { key: "cards", label: "Cards" },
      { key: "limit", label: "Default daily limit" }, { key: "rewards", label: "Rewards profile" }, { key: "status", label: "Status" },
    ],
    rows: [
      { program: "Platinum Debit", type: "Debit · Retail", scheme: "Visa · 482100", cards: "8,421", limit: "PKR 250,000", rewards: "Everyday base points", status: "Live" },
      { program: "World Credit", type: "Credit · Retail", scheme: "Mastercard · 527600", cards: "3,108", limit: "PKR 500,000", rewards: "Category multipliers", status: "Live" },
      { program: "Business Expense", type: "Debit · Commercial", scheme: "Visa · 482160", cards: "4,912", limit: "PKR 1,000,000", rewards: "No rewards", status: "Live" },
      { program: "Youth Prepaid", type: "Prepaid · Retail", scheme: "Mastercard · 527640", cards: "2,842", limit: "PKR 50,000", rewards: "Cashback", status: "Live" },
      { program: "Qubits Digital Gift", type: "Gift Card · Closed-loop", scheme: "Merchant network · No BIN", cards: "6,284", limit: "PKR 100,000", rewards: "No rewards", status: "Live" },
      { program: "Fleet Fuel Prepaid", type: "Fuel Card · Commercial", scheme: "Visa · 482190", cards: "1,846", limit: "PKR 250,000", rewards: "Merchant campaigns", status: "Live" },
      { program: "Green Virtual", type: "Virtual · Retail", scheme: "Visa · 482180", cards: "—", limit: "PKR 100,000", rewards: "Everyday base points", status: "Draft" },
    ],
    filters: ["All programs", "Live", "Draft", "Retail", "Business"],
  },
  Integrations: {
    description: "Monitor switch, processor, scheme, wallet and enterprise service connectivity.",
    primary: "Add integration",
    metrics: [
      { label: "Connected services", value: "18 / 19", detail: "One degraded", tone: "amber" },
      { label: "API success rate", value: "99.96%", detail: "Past 24 hours", tone: "green" },
      { label: "P95 latency", value: "184 ms", detail: "-22 ms this week", tone: "blue" },
      { label: "Messages today", value: "284.9k", detail: "ISO 8583 + REST" },
    ],
    columns: [
      { key: "service", label: "Integration" }, { key: "category", label: "Category" },
      { key: "protocol", label: "Protocol" }, { key: "latency", label: "P95 latency" },
      { key: "success", label: "Success rate" }, { key: "status", label: "Health" },
    ],
    rows: [
      { service: "IRIS Card Switch", category: "Processor", protocol: "ISO 8583 / TCP", latency: "42 ms", success: "99.99%", status: "Healthy" },
      { service: "Visa VTS", category: "Token service", protocol: "REST / mTLS", latency: "181 ms", success: "99.97%", status: "Healthy" },
      { service: "Mastercard MDES", category: "Token service", protocol: "REST / mTLS", latency: "194 ms", success: "99.95%", status: "Healthy" },
      { service: "Courier Fulfilment", category: "Operations", protocol: "SFTP / PGP", latency: "—", success: "96.8%", status: "Degraded" },
      { service: "Fraud Decisioning", category: "Risk", protocol: "REST / JSON", latency: "88 ms", success: "99.98%", status: "Healthy" },
    ],
    filters: ["All services", "Healthy", "Degraded", "Schemes", "Internal"],
  },
  "HSM & Keys": {
    description: "Govern cryptographic keys, ceremonies, expiry and HSM cluster availability.",
    primary: "Start key ceremony",
    metrics: [
      { label: "HSM cluster", value: "2 / 2", detail: "Active-active · healthy", tone: "green" },
      { label: "Active keys", value: "46", detail: "Across 8 key types" },
      { label: "Rotation due", value: "4", detail: "Within 30 days", tone: "amber" },
      { label: "Failed operations", value: "0", detail: "Past 24 hours", tone: "green" },
    ],
    columns: [
      { key: "alias", label: "Key alias" }, { key: "type", label: "Key type" },
      { key: "algorithm", label: "Algorithm" }, { key: "usage", label: "Usage" },
      { key: "rotation", label: "Next rotation" }, { key: "status", label: "State" },
    ],
    rows: [
      { alias: "ZPK-VISA-PROD-02", type: "ZPK", algorithm: "TDES 2-key", usage: "PIN translation", rotation: "12 Oct 2026", status: "Active" },
      { alias: "CVK-MC-PROD-01", type: "CVK", algorithm: "TDES 2-key", usage: "CVV validation", rotation: "28 Sep 2026", status: "Rotation due" },
      { alias: "IMK-AC-VISA-01", type: "IMK-AC", algorithm: "AES-256", usage: "EMV cryptogram", rotation: "04 Jan 2027", status: "Active" },
      { alias: "TLS-VTS-MTLS-03", type: "RSA private", algorithm: "RSA-3072", usage: "VTS mutual TLS", rotation: "19 Dec 2026", status: "Active" },
      { alias: "KEK-BACKUP-01", type: "KEK", algorithm: "AES-256", usage: "Key wrapping", rotation: "01 Oct 2026", status: "Dual control" },
    ],
    filters: ["All keys", "Active", "Rotation due", "Dual control", "Retired"],
  },
  Reports: {
    description: "Generate operational, financial, scheme and compliance reports with controlled access.",
    primary: "Create report",
    metrics: [
      { label: "Scheduled reports", value: "28", detail: "12 daily · 9 monthly" },
      { label: "Generated today", value: "84", detail: "100% successful", tone: "green" },
      { label: "Awaiting download", value: "7", detail: "Encrypted exports", tone: "blue" },
      { label: "Retention", value: "7 years", detail: "Audit policy enforced" },
    ],
    columns: [
      { key: "report", label: "Report" }, { key: "category", label: "Category" },
      { key: "frequency", label: "Schedule" }, { key: "format", label: "Format" },
      { key: "lastRun", label: "Last generated" }, { key: "status", label: "Status" },
    ],
    rows: [
      { report: "Daily Card Activity", category: "Operations", frequency: "Daily · 01:00", format: "CSV", lastRun: "Today, 01:02", status: "Ready" },
      { report: "Scheme Settlement Summary", category: "Finance", frequency: "Daily · 08:00", format: "XLSX", lastRun: "Today, 08:04", status: "Ready" },
      { report: "PCI Access Review", category: "Compliance", frequency: "Monthly", format: "PDF", lastRun: "01 Sep 2026", status: "Ready" },
      { report: "Fraud Loss & Recovery", category: "Risk", frequency: "Weekly", format: "XLSX", lastRun: "14 Sep 2026", status: "Ready" },
      { report: "Card Expiry Forecast", category: "Portfolio", frequency: "On demand", format: "CSV", lastRun: "18 Sep 2026", status: "Draft" },
      { report: "Gift Card Liability & Breakage", category: "Finance", frequency: "Daily · 02:00", format: "XLSX", lastRun: "Today, 02:03", status: "Ready" },
      { report: "Merchant Settlement Summary", category: "Finance", frequency: "Daily · 04:00", format: "XLSX", lastRun: "Today, 04:06", status: "Ready" },
      { report: "Corporate Campaign Utilization", category: "Portfolio", frequency: "Weekly", format: "PDF", lastRun: "18 Sep 2026", status: "Ready" },
      { report: "Gift Redemption & Reconciliation", category: "Operations", frequency: "Daily · 05:00", format: "CSV", lastRun: "Today, 05:02", status: "Ready" },
      { report: "Hybrid Funding Routing Performance", category: "Operations", frequency: "Daily · 06:00", format: "XLSX", lastRun: "Today, 06:03", status: "Ready" },
      { report: "Digital Credential & Token Lifecycle", category: "Security", frequency: "Daily · 06:30", format: "CSV", lastRun: "Today, 06:32", status: "Ready" },
      { report: "Authorization Data Quality", category: "Technology", frequency: "Hourly", format: "JSON", lastRun: "12 min ago", status: "Ready" },
      { report: "Fleet Fuel Usage & Exceptions", category: "Portfolio", frequency: "Daily · 03:00", format: "XLSX", lastRun: "Today, 03:04", status: "Ready" },
      { report: "Rewards Liability & Expiry", category: "Finance", frequency: "Daily · 02:30", format: "XLSX", lastRun: "Today, 02:34", status: "Ready" },
      { report: "Rewards Earn & Redemption", category: "Portfolio", frequency: "Weekly", format: "PDF", lastRun: "21 Sep 2026", status: "Ready" },
      { report: "Reward Reversals & Adjustments", category: "Audit", frequency: "Daily · 04:30", format: "CSV", lastRun: "Today, 04:31", status: "Ready" },
    ],
    filters: ["Report library", "Scheduled", "Operations", "Finance", "Compliance"],
  },
};

const controlRules = [
  { name: "Contactless transaction cap", detail: "Require online PIN above PKR 25,000", scope: "All retail debit", enabled: true },
  { name: "Cross-border e-commerce", detail: "Block unless customer enables international usage", scope: "Retail cards", enabled: true },
  { name: "ATM velocity control", detail: "Maximum 3 withdrawals in 30 minutes", scope: "All programs", enabled: true },
  { name: "High-risk MCC restriction", detail: "Decline gambling and crypto exchange MCCs", scope: "Youth & prepaid", enabled: true },
  { name: "Magstripe fallback", detail: "Permit fallback after chip read failure", scope: "Domestic only", enabled: false },
  { name: "Offline transaction floor", detail: "Allow offline approvals below PKR 5,000", scope: "Platinum debit", enabled: false },
  { name: "Gift card cash-out restriction", detail: "Block ATM, cash withdrawal and P2P transfers", scope: "All gift cards", enabled: true },
  { name: "Gift card purchase velocity", detail: "Maximum 5 cards or PKR 100,000 per buyer per day", scope: "Gift card programs", enabled: true },
  { name: "Repeated gift-card PIN attempts", detail: "Block voucher after 5 failed security-code attempts", scope: "Gift redemption gateway", enabled: true },
  { name: "Gift card high-value approval", detail: "Manual approval for orders above PKR 250,000", scope: "Corporate & bulk gifting", enabled: true },
  { name: "Rapid full-balance redemption", detail: "Review full redemption within 10 minutes of issuance", scope: "All gift cards", enabled: true },
  { name: "Merchant terminal velocity", detail: "Review unusual redemption volume by terminal and branch", scope: "Partner merchant network", enabled: true },
  { name: "Secure card-detail access", detail: "Require biometric or passcode before revealing PAN and CVV", scope: "Numberless & digital cards", enabled: true },
  { name: "One-time credential expiry", detail: "Close after one approval or 24 hours, whichever occurs first", scope: "One-time virtual cards", enabled: true },
  { name: "Hybrid funding fallback", detail: "Use only eligible funded sources; decline when no approved fallback remains", scope: "Hybrid card programs", enabled: true },
  { name: "Wallet provisioning assurance", detail: "Step-up ID&V for new device or low-assurance token requests", scope: "Wallet tokenization", enabled: true },
  { name: "Fuel merchant restriction", detail: "Approve only MCC 5541/5542 and configured fuel-station merchants", scope: "Fuel card programs", enabled: true },
  { name: "Fuel card channel restriction", detail: "Allow POS/contactless; block ATM, e-commerce, cash-out and P2P", scope: "Fuel card programs", enabled: true },
  { name: "Reward eligibility exclusions", detail: "Exclude cash advances, fees, interest, P2P, wallet funding and reversed transactions", scope: "All reward programs", enabled: true },
  { name: "Reward abuse velocity", detail: "Review rapid earn-and-redeem cycles, split purchases and repeated refund behavior", scope: "Rewards & Loyalty", enabled: true },
];

const cardProductKnowledge = [
  {
    category: "Business model", title: "Gift-card platform model", icon: BookOpen,
    summary: "A stored-value gifting platform that aggregates partner brands into closed-loop and multi-merchant digital or physical vouchers.",
    points: ["Universal cards work across the complete partner network", "Category and Occasion cards restrict usage to a curated merchant set", "Brand cards are redeemable only with the selected brand"],
  },
  {
    category: "Products", title: "Gift card types", icon: TicketCheck,
    summary: "The catalogue is structured around recipient choice and merchant acceptance scope.",
    points: ["Universal: any participating partner brand", "Category: dining, fashion, home, beauty, travel and similar groups", "Occasion: birthday, wedding, Eid, congratulations and campaign collections", "Brand: one named merchant or retail chain"],
  },
  {
    category: "Purchase", title: "Purchase and delivery journey", icon: ShoppingBag,
    summary: "A purchaser selects the product and value, enters recipient details, personalizes the gift, pays and chooses when it is delivered.",
    points: ["PKR 1,000–50,000 denomination or custom amount", "Email, SMS or physical-card delivery", "Instant or future scheduled delivery", "Text, voice or video greeting", "Payment by bank card, bank transfer, JazzCash or Easypaisa"],
  },
  {
    category: "Redemption", title: "In-store redemption", icon: Store,
    summary: "The cashier validates the voucher identifier and security code before applying stored value to the sale.",
    points: ["Customer provides a 12-digit gift-card number and 4-digit security code", "Cashier enters or scans the voucher through the merchant redemption channel", "Partial redemption preserves the unused balance", "Split tender covers any sale amount above the available balance"],
  },
  {
    category: "Redemption", title: "Online redemption", icon: Network,
    summary: "The customer enters the voucher code in the merchant’s promo, coupon or gift-card field.",
    points: ["Supported format: GK-[12-digit number]-[4-digit security code]", "Eligibility is checked against brand, category or Universal scope", "The remaining balance stays available for later use", "Reversals restore value through an idempotent transaction reference"],
  },
  {
    category: "Lifecycle", title: "Validity, refund and balance", icon: RefreshCw,
    summary: "Gift-card lifecycle rules protect both the purchaser and the stored-value liability ledger.",
    points: ["Standard validity is 12 months", "Unredeemed vouchers may be refunded within 7 days", "Partially redeemed cards remain active until balance exhaustion or expiry", "Every issuance, redemption, reversal and expiry posts to the liability ledger"],
  },
  {
    category: "Corporate", title: "Corporate and bulk gifting", icon: Building2,
    summary: "Businesses can run controlled campaigns for employees, customers, distributors and loyalty programs.",
    points: ["Bulk recipient upload and validation", "Custom branding and personalized messages", "Scheduled digital delivery or physical fulfilment", "Purchase-order, prepaid-funding and corporate-invoice procurement", "Campaign utilization and unused-balance reporting"],
  },
  {
    category: "Merchant operations", title: "Partner network operations", icon: Network,
    summary: "Each participating merchant requires acceptance, credential, commercial and settlement configuration.",
    points: ["Brand, category, branch and online-store eligibility", "POS API, cashier portal, QR and online-code channels", "Commission, settlement cycle and reconciliation rules", "Terminal credentials, refund permissions and exception handling"],
  },
  {
    category: "Qubits CMS", title: "Recommended Qubits data model", icon: WalletCards,
    summary: "Qubits should separate product design, acceptance and value accounting so every gift type can be configured without code changes.",
    points: ["Gift Program → Card Type → Merchant Network", "Merchant Network → Brand → Branch / Online Store", "Voucher → Security Code → Stored Value Account", "Campaign → Recipient → Delivery Event", "Redemption → Reversal → Merchant Settlement"],
  },
  {
    category: "Risk", title: "Fraud and operational controls", icon: ShieldAlert,
    summary: "Gift-card controls must be evaluated during purchase, activation and redemption.",
    points: ["Buyer issuance and value velocity", "Repeated security-code attempts and voucher lock", "Rapid full-balance redemption after issuance", "High-value corporate order approval", "Merchant terminal, branch and reversal velocity"],
  },
  {
    category: "Employee cards", title: "Employee allowance card", icon: UserCheck,
    summary: "An employer-funded physical or virtual card used to distribute recurring employee benefits without mixing them with salary or personal funds.",
    points: ["Link every card to company, department, cost centre and employee", "Support monthly, quarterly, annual and one-time allocations", "Configure merchant-category, channel, geography and time restrictions", "Choose whether unused allowance expires, rolls over or returns to the company pool", "Suspend automatically when employment status changes"],
  },
  {
    category: "Employee cards", title: "Allowance plan and funding model", icon: CircleDollarSign,
    summary: "The company funds a central account while Qubits maintains individual employee allocation ledgers and utilization balances.",
    points: ["Company Funding Account → Allowance Plan → Employee Allocation", "Separate available balance from approved monthly allowance", "Support payroll-file, HRMS API and manual bulk allocations", "Prevent allocation when the company funding account is insufficient", "Post unused or expired value according to employer policy"],
  },
  {
    category: "Fuel allowance", title: "Employee fuel allowance", icon: Fuel,
    summary: "A restricted employee benefit usable only for qualifying fuel purchases and optionally tied to a driver or registered vehicle.",
    points: ["Amount-based allowance such as PKR 30,000 per month", "Quantity-based allowance such as 100 litres per month", "Allow petrol, diesel, CNG or a configured combination", "Restrict authorization to fuel MCC 5541/5542 and approved stations", "Apply transaction, daily, weekly and monthly consumption limits"],
  },
  {
    category: "Fuel allowance", title: "Fuel authorization controls", icon: CarFront,
    summary: "Fuel controls are evaluated before checking the employee allowance or prepaid balance.",
    points: ["Validate card, employee and vehicle status", "Validate merchant MCC, station allowlist and geography", "Check permitted fuel type, amount or litre allocation and velocity", "Capture odometer, vehicle registration or driver PIN when required", "Block ATM, e-commerce, P2P, cash withdrawal and non-fuel purchases"],
  },
  {
    category: "Corporate expense", title: "Corporate expense card", icon: Building2,
    summary: "A company-controlled card for travel, procurement, subscriptions, petty cash and departmental spending with policy enforcement at authorization time.",
    points: ["Issue named employee, department, project, vendor-locked and single-use virtual cards", "Assign cost centre, budget, expense category and accounting code", "Set per-transaction, daily, monthly and trip-specific limits", "Control MCC, merchant, geography, channel, currency and usage schedule", "Allow instant freeze, replacement and temporary limit changes"],
  },
  {
    category: "Corporate expense", title: "Expense workflow and reconciliation", icon: FileCheck2,
    summary: "Corporate card transactions should move from authorization to evidence collection, approval, accounting and settlement.",
    points: ["Require receipt upload and business purpose", "Auto-match card transactions with submitted expenses", "Route exceptions to employee, manager and finance approval", "Support policy breach, missing receipt and duplicate expense queues", "Export approved entries to ERP or general ledger with cost-centre coding"],
  },
  {
    category: "Wallet-linked card", title: "BOTIM-style wallet card", icon: Smartphone,
    summary: "A consumer card linked to an app wallet, allowing the customer to spend wallet balance through a physical or virtual payment credential.",
    points: ["Issue virtual card instantly after eligible KYC", "Optionally order and activate a physical card", "Use the wallet ledger as the available card balance", "Support POS, contactless, e-commerce and tokenized wallet transactions", "Configure ATM and international usage by market, KYC tier and program policy"],
  },
  {
    category: "Wallet-linked card", title: "Wallet and card lifecycle", icon: Smartphone,
    summary: "The mobile wallet remains the customer experience layer while Qubits manages card credentials, authorizations, controls and settlement.",
    points: ["Wallet onboarding → KYC tier → virtual-card eligibility", "Wallet funding → available card balance in real time", "In-app card view, PIN, freeze, limits and transaction history", "Device binding, OTP or step-up authentication for sensitive actions", "Card replacement must preserve or securely relink the wallet account"],
  },
  {
    category: "Architecture", title: "Product hierarchy in Qubits CMS", icon: WalletCards,
    summary: "All four models can share a common card platform while keeping funding, acceptance and accounting rules configurable by program.",
    points: ["Institution → Company / Consumer → Program → Funding Account", "Program → BIN → Card Product → Physical / Virtual Credential", "Employee → Department → Cost Centre → Allowance or Budget", "Card → Controls → Merchant Network / MCC → Authorization Decision", "Transaction → Receipt / Evidence → Approval → Settlement → ERP Posting"],
  },
  {
    category: "Architecture", title: "Shared authorization sequence", icon: ShieldCheck,
    summary: "A single policy engine should evaluate product-specific rules in a predictable order before approving a transaction.",
    points: ["Card and customer or employee status", "Company or wallet funding availability", "Allowance, budget or stored-value availability", "Merchant, MCC, channel, location and time eligibility", "Transaction, daily, monthly and velocity limits", "Approve, decline, step-up or send for review with a recorded reason"],
  },
  {
    category: "Hybrid cards", title: "One card, multiple accounts", icon: Repeat2,
    summary: "A hybrid credential can connect debit, credit, prepaid, benefit and currency wallets while keeping one customer-facing card.",
    points: ["Cardholder can change the preferred payment source in real time", "Policy rules can choose an account automatically by MCC, currency or purpose", "Every authorization records the selected source and fallback outcome", "A single product can support consumer, corporate, subsidy and specialist financing use cases"],
  },
  {
    category: "Digital security", title: "Numberless and disposable credentials", icon: Fingerprint,
    summary: "Sensitive credentials remain inside the application rather than being printed on the physical card.",
    points: ["Hide PAN and CVV on numberless physical cards", "Require biometric or passcode verification to reveal credentials", "Create one-time virtual cards for sensitive purchases", "Create merchant-locked and amount-limited virtual credentials", "Issue replacement credentials immediately after loss or expiry"],
  },
  {
    category: "Tokenization", title: "Push provisioning and wallet lifecycle", icon: Smartphone,
    summary: "Eligible cards can be provisioned directly to major or issuer-branded wallets and managed throughout the token lifecycle.",
    points: ["Apple Pay, Google Wallet and Samsung Pay eligibility", "Push provisioning with identity and verification decision", "Device, token requestor and assurance-level inventory", "Suspend, resume, replace and delete token operations", "Relink eligible tokens during card replacement"],
  },
  {
    category: "Authorization data", title: "Enriched real-time transaction data", icon: Activity,
    summary: "Qubits should expose a detailed authorization record for risk decisions, customer support, analytics and product optimization.",
    points: ["Merchant, terminal, MCC, entry mode and authentication result", "Token requestor, device and wallet assurance", "Funding source, available balance and hybrid routing decision", "Applied controls, risk score and decline evidence", "Network response, reversal, clearing and settlement status"],
  },
  {
    category: "Issuer processing", title: "Configurable scalable issuing platform", icon: Network,
    summary: "Card products should be assembled from reusable capabilities instead of requiring code changes for every new programme.",
    points: ["Instant physical and virtual card issuance", "EMV, tokenization and full digital or physical branding controls", "Reusable templates for travel, rewards, teen, expense, benefits and financing", "Independent scheme adapters for Visa, Mastercard and local networks", "Operational dashboards for volume, latency, availability and routing health"],
  },
];

const configurationSections = [
  { name: "Users & roles", detail: "RBAC, maker-checker access and privileged operators", icon: UsersRound, count: "42 users" },
  { name: "Approval workflows", detail: "Dual-control policies for sensitive operations", icon: UserCheck, count: "8 workflows" },
  { name: "Notifications", detail: "Customer and operator event templates", icon: Activity, count: "36 templates" },
  { name: "Scheme parameters", detail: "Response codes, reason codes and processing windows", icon: CreditCard, count: "3 schemes" },
  { name: "Audit & retention", detail: "Immutable activity log and data lifecycle policies", icon: FileCheck2, count: "7-year policy" },
  { name: "System preferences", detail: "Currencies, time zone, localization and defaults", icon: Settings, count: "Pakistan / PKR" },
];

const statusClass = (value: string) => {
  const v = value.toLowerCase();
  if (/(active|approved|verified|healthy|ready|live|low|closed)/.test(v)) return "good";
  if (/(critical|declined|high|evidence due|at risk)/.test(v)) return "bad";
  if (/(pending|review|due|degraded|medium|draft|suspended|investigate)/.test(v)) return "warn";
  return "neutral";
};

type Notify = (message: string, tone?: "success" | "info" | "warning") => void;

function downloadCsv(title: string, config: ModuleConfig) {
  const header = config.columns.map(column => column.label).join(",");
  const lines = config.rows.map(row => config.columns.map(column => `"${String(row[column.key] || "").replaceAll('"', '""')}"`).join(","));
  const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `qubits-${title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function ModuleHeader({ title, config, onNotify, onPrimary }: { title: string; config: ModuleConfig; onNotify: Notify; onPrimary?: () => void }) {
  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState("");
  const submit = () => {
    setOpen(false);
    setReference("");
    onNotify(`${config.primary} workflow created successfully`, "success");
  };
  return <>
    <section className="module-heading">
      <div><p className="eyebrow">CARD OPERATIONS</p><h1>{title}</h1><p>{config.description}</p></div>
      <div className="module-actions">
        <button onClick={() => { downloadCsv(title, config); onNotify(`${title} CSV exported`, "success"); }}><Download />Export</button>
        <Button onClick={() => onPrimary ? onPrimary() : setOpen(true)}><Plus />{config.primary}</Button>
      </div>
    </section>
    {open && !onPrimary && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="action-modal" role="dialog" aria-modal="true" aria-labelledby="workflow-title" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2 id="workflow-title">{config.primary}</h2><p>Complete the required information. The request will follow the configured maker-checker workflow.</p></div><button onClick={() => setOpen(false)} aria-label="Close workflow"><XCircle /></button></div>
      <div className="workflow-form"><label>Reference or customer<Input value={reference} onChange={event => setReference(event.target.value)} placeholder="Enter customer, card or reference" /></label><label>Processing priority<select defaultValue="Standard"><option>Standard</option><option>Urgent</option><option>Scheduled</option></select></label><label>Operator note<textarea placeholder="Add an optional instruction" /></label><div><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!reference.trim()} onClick={submit}>Submit request</Button></div></div>
    </section></div>}
  </>;
}

function ModuleMetrics({ metrics }: { metrics: ModuleConfig["metrics"] }) {
  return <section className="module-metrics">{metrics.map((metric) =>
    <article key={metric.label} className={`module-kpi ${metric.tone || ""}`}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></article>
  )}</section>;
}

function DataModule({ title, config, onNotify, onPrimary }: { title: string; config: ModuleConfig; onNotify: Notify; onPrimary?: () => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(config.filters[0]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<Row | null>(null);
  const [page, setPage] = useState(1);
  const [updated, setUpdated] = useState("just now");
  const rows = useMemo(() => {
    const first = config.filters[0];
    return config.rows.filter(row => {
      const text = Object.values(row).join(" ").toLowerCase();
      const queryMatch = text.includes(query.toLowerCase());
      if (filter === first || /all|library|live feed|open queue/i.test(filter)) return queryMatch;
      const words = filter.toLowerCase().split(" ");
      return queryMatch && words.some(word => word.length > 3 && text.includes(word));
    });
  }, [config.rows, config.filters, query, filter]);

  const refresh = () => {
    setUpdated("just now");
    onNotify(`${title} data refreshed`, "info");
  };

  return <>
    <ModuleHeader title={title} config={config} onNotify={onNotify} onPrimary={onPrimary} />
    <ModuleMetrics metrics={config.metrics} />
    <section className="module-workbench">
      <div className="module-toolbar">
        <div className="module-tabs">{config.filters.map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setPage(1); }}>{item}</button>)}</div>
        <div className="module-tools"><label><Search /><input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder={`Search ${title.toLowerCase()}`} /></label><button className={filterOpen ? "tool-active" : ""} onClick={() => setFilterOpen(value => !value)}><SlidersHorizontal />Filters</button><button aria-label="Refresh" onClick={refresh}><RefreshCw /></button></div>
      </div>
      {filterOpen && <div className="advanced-filter"><label>From<input type="date" defaultValue="2026-09-01" /></label><label>To<input type="date" defaultValue="2026-09-19" /></label><label>Status<select value={filter} onChange={event => setFilter(event.target.value)}>{config.filters.map(item => <option key={item}>{item}</option>)}</select></label><Button size="sm" onClick={() => { setFilterOpen(false); onNotify("Filters applied", "success"); }}>Apply filters</Button></div>}
      <div className="module-table-wrap"><table className="module-table"><thead><tr>{config.columns.map(col => <th key={col.key}>{col.label}</th>)}<th /></tr></thead>
        <tbody>{rows.length ? rows.map((row, index) => <tr key={index} onClick={() => setSelected(row)}>{config.columns.map((col, colIndex) =>
          <td key={col.key}>{col.key === "status" || col.key === "risk" || col.key === "kyc" || col.key === "score"
            ? <span className={`record-status ${statusClass(row[col.key])}`}><i />{row[col.key]}</span>
            : colIndex === 0 ? <strong>{row[col.key]}</strong> : row[col.key]}</td>
        )}<td><button className="row-action" onClick={event => { event.stopPropagation(); setSelected(row); }} aria-label="Open record"><MoreHorizontal /></button></td></tr>)
        : <tr><td colSpan={config.columns.length + 1}><div className="empty-records"><Search /><strong>No matching records</strong><span>Try another search or filter.</span><button onClick={() => { setQuery(""); setFilter(config.filters[0]); }}>Clear filters</button></div></td></tr>}</tbody>
      </table></div>
      <footer className="module-footer"><span>{rows.length} records shown · Updated {updated}</span><div><button disabled={page === 1} onClick={() => setPage(value => Math.max(1, value - 1))}>Previous</button>{[1,2,3].map(number => <button key={number} className={page === number ? "active" : ""} onClick={() => setPage(number)}>{number}</button>)}<button disabled={page === 3} onClick={() => setPage(value => Math.min(3, value + 1))}>Next</button></div></footer>
    </section>
    <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
      <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{title} record</DialogTitle><DialogDescription>Review the complete record and choose an operational action.</DialogDescription></DialogHeader>
        {selected && <div className="record-detail">{config.columns.map(column => <div key={column.key}><span>{column.label}</span><strong>{selected[column.key]}</strong></div>)}</div>}
        <div className="record-actions"><Button variant="outline" onClick={() => onNotify("Record added to review queue", "info")}><Eye />Review</Button><Button onClick={() => { setSelected(null); onNotify("Operational action completed", "success"); }}><CheckCircle2 />Complete action</Button></div>
      </DialogContent>
    </Dialog>
  </>;
}

function RewardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Rewards & Loyalty"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", program: "Platinum Debit", model: "Points", rewardValue: "1", spendUnit: "100",
    eligibility: "All eligible retail purchases", cap: "Unlimited", capValue: "", expiry: "24 months",
    start: "", end: "", reversal: "Reverse on refund or chargeback",
  });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const rate = form.model === "Cashback" || form.model === "Merchant-funded cashback"
    ? `${form.rewardValue}%`
    : form.model === "Milestone bonus"
      ? `${Number(form.rewardValue).toLocaleString()} points`
      : `${form.rewardValue} ${form.model === "Airline miles" ? "miles" : "points"} / PKR ${Number(form.spendUnit).toLocaleString()}`;
  const create = () => {
    setRows(current => [{
      rule: form.name.trim(), program: form.program, model: form.model, earnRate: rate,
      eligibility: form.eligibility, cap: form.cap === "Unlimited" ? "Unlimited" : `${form.cap}: ${Number(form.capValue).toLocaleString()}`,
      status: form.start && new Date(form.start) > new Date() ? "Scheduled" : "Draft",
    }, ...current]);
    setOpen(false);
    setForm({ name: "", program: "Platinum Debit", model: "Points", rewardValue: "1", spendUnit: "100", eligibility: "All eligible retail purchases", cap: "Unlimited", capValue: "", expiry: "24 months", start: "", end: "", reversal: "Reverse on refund or chargeback" });
    onNotify("Reward earning rule created as Draft", "success");
  };
  const needsSpendUnit = !["Cashback", "Merchant-funded cashback", "Milestone bonus"].includes(form.model);
  const valid = Boolean(form.name.trim()) && Number(form.rewardValue) > 0 && (!needsSpendUnit || Number(form.spendUnit) > 0) && (form.cap === "Unlimited" || Number(form.capValue) > 0);
  return <>
    <DataModule title="Rewards & Loyalty" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks">
      <article><CircleDollarSign /><div><strong>Statement credit</strong><span>Convert points or cashback against card balance</span></div></article>
      <article><Gift /><div><strong>Gift cards & catalogue</strong><span>Redeem with brands and fulfilment partners</span></div></article>
      <article><Network /><div><strong>Travel & miles transfer</strong><span>Airline, hotel and travel-partner conversion</span></div></article>
      <article><ShoppingBag /><div><strong>Pay with points</strong><span>Full or partial redemption at checkout</span></div></article>
    </section>
    <section className="gift-ops-grid">
      <article className="module-workbench gift-controls"><div className="section-title"><div><h2>Reward lifecycle controls</h2><p>Applied to every points or cashback ledger</p></div><RefreshCw /></div><div className="gift-control-list"><span><i />Pending-to-available settlement</span><span><i />Refund and chargeback reversal</span><span><i />Expiry and customer notification</span><span><i />Manual adjustment with approval</span></div></article>
      <article className="module-workbench gift-controls"><div className="section-title"><div><h2>Eligible-spend protection</h2><p>Standard non-purchase exclusions</p></div><ShieldCheck /></div><div className="gift-control-list"><span><i />Cash advance excluded</span><span><i />Fees and interest excluded</span><span><i />P2P and wallet funding excluded</span><span><i />Fraud and reversed spend excluded</span></div></article>
    </section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Create reward earning rule</h2><p>Configure how eligible card spend creates points, cashback, miles or a milestone bonus.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label className="wide">Rule name<Input value={form.name} onChange={event => update("name", event.target.value)} placeholder="e.g. 3× international spend" autoFocus /></label>
      <label>Card program<select value={form.program} onChange={event => update("program", event.target.value)}><option>Platinum Debit</option><option>World Credit</option><option>Business Expense</option><option>Youth Prepaid</option><option>Wallet-linked Virtual</option><option>Signature Travel</option><option>Fleet Fuel Prepaid</option></select></label>
      <label>Reward model<select value={form.model} onChange={event => update("model", event.target.value)}><option>Points</option><option>Cashback</option><option>Airline miles</option><option>Merchant-funded cashback</option><option>Milestone bonus</option></select></label>
      <label>{form.model.includes("cashback") || form.model === "Cashback" ? "Cashback percentage" : form.model === "Milestone bonus" ? "Bonus points" : "Reward units"}<Input type="number" min="0.01" step="0.01" value={form.rewardValue} onChange={event => update("rewardValue", event.target.value)} /></label>
      {needsSpendUnit && <label>Spend unit (PKR)<Input type="number" min="1" value={form.spendUnit} onChange={event => update("spendUnit", event.target.value)} /></label>}
      <label className={needsSpendUnit ? "wide" : ""}>Eligible spend<select value={form.eligibility} onChange={event => update("eligibility", event.target.value)}><option>All eligible retail purchases</option><option>International purchases</option><option>Dining MCCs</option><option>Fuel MCC 5541/5542</option><option>Travel MCCs</option><option>Named merchant campaign</option><option>First 60-day spend milestone</option></select></label>
      <label>Reward cap<select value={form.cap} onChange={event => update("cap", event.target.value)}><option>Unlimited</option><option>Per month</option><option>Per statement cycle</option><option>Per campaign</option><option>Once per card</option></select></label>
      <label>Cap value<Input type="number" min="1" disabled={form.cap === "Unlimited"} value={form.capValue} onChange={event => update("capValue", event.target.value)} placeholder="Points or PKR" /></label>
      <label>Reward expiry<select value={form.expiry} onChange={event => update("expiry", event.target.value)}><option>Never while account is active</option><option>12 months</option><option>18 months</option><option>24 months</option><option>36 months</option><option>End of campaign</option></select></label>
      <label>Reversal handling<select value={form.reversal} onChange={event => update("reversal", event.target.value)}><option>Reverse on refund or chargeback</option><option>Reverse after dispute is resolved</option><option>Manual review above threshold</option></select></label>
      <label>Start date<Input type="date" value={form.start} onChange={event => update("start", event.target.value)} /></label><label>End date<Input type="date" value={form.end} onChange={event => update("end", event.target.value)} /></label>
      <div className="rule-summary"><Sparkles /><div><strong>{rate}</strong><span>Reward events will post to a separate customer ledger after transaction settlement and follow the configured expiry, cap and reversal rules.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!valid} onClick={create}>Create as draft</Button></footer>
    </div></section></div>}
  </>;
}

function FraudModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Fraud & Risk"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", signal: "Velocity", threshold: "", scope: "All card programs", action: "Send to review" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const createRule = () => {
    const newRule: Row = {
      case: `FRD-RULE-${String(rows.length + 101).padStart(4, "0")}`,
      customer: form.scope,
      signal: `${form.name} · ${form.signal}`,
      amount: form.threshold || "Configured threshold",
      score: "Rule / New",
      status: "Draft",
    };
    setRows(current => [newRule, ...current]);
    setOpen(false);
    setForm({ name: "", signal: "Velocity", threshold: "", scope: "All card programs", action: "Send to review" });
    onNotify("Fraud rule created and added as Draft", "success");
  };

  return <>
    <DataModule title="Fraud & Risk" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    {open && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" role="dialog" aria-modal="true" aria-labelledby="fraud-rule-title" onMouseDown={event => event.stopPropagation()}>
      <div className="action-modal-head"><div><h2 id="fraud-rule-title">Create fraud rule</h2><p>Define the detection signal, evaluation scope and real-time authorization response.</p></div><button onClick={() => setOpen(false)} aria-label="Close fraud rule"><XCircle /></button></div>
      <div className="rule-form">
        <label className="wide">Rule name<Input value={form.name} onChange={event => update("name", event.target.value)} placeholder="e.g. Rapid cross-border velocity" /></label>
        <label>Detection signal<select value={form.signal} onChange={event => update("signal", event.target.value)}><option>Velocity</option><option>Amount threshold</option><option>Geographic anomaly</option><option>Merchant category</option><option>Device risk</option></select></label>
        <label>Evaluation scope<select value={form.scope} onChange={event => update("scope", event.target.value)}><option>All card programs</option><option>Retail debit</option><option>Credit cards</option><option>Business expense</option><option>Virtual and prepaid</option></select></label>
        <label className="wide">Threshold or condition<Input value={form.threshold} onChange={event => update("threshold", event.target.value)} placeholder="e.g. 5 transactions in 10 minutes" /></label>
        <label className="wide">Decision action<select value={form.action} onChange={event => update("action", event.target.value)}><option>Send to review</option><option>Decline transaction</option><option>Step-up authentication</option><option>Temporarily block card</option><option>Monitor only</option></select></label>
        <div className="rule-summary"><ShieldAlert /><div><strong>{form.action}</strong><span>Matches will be logged with full decision evidence and sent through maker-checker approval before activation.</span></div></div>
        <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.name.trim() || !form.threshold.trim()} onClick={createRule}>Create as draft</Button></footer>
      </div>
    </section></div>}
  </>;
}

function GiftCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Gift Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    recipient: "", contact: "", purchaser: "", amount: "", cardType: "Universal",
    scope: "All partner brands", delivery: "Email", personalization: "Text message", message: "", schedule: "",
  });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const validAmount = Number(form.amount) >= 1000 && Number(form.amount) <= 50000;
  const issueGiftCard = () => {
    const suffix = String(684209110000 + rows.length * 37).slice(-12);
    const value = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(form.amount));
    setRows(current => [{
      card: `GK-•••• •••• ${suffix.slice(-4)}`,
      recipient: form.recipient.trim(),
      type: form.cardType,
      scope: form.scope,
      balance: `PKR ${value}`,
      delivery: `${form.delivery}${form.schedule ? " · Scheduled" : " · Instant"}`,
      expiry: "22 Sep 2027",
      status: form.delivery === "Physical" ? "Awaiting activation" : "Active",
    }, ...current]);
    setOpen(false);
    setForm({ recipient: "", contact: "", purchaser: "", amount: "", cardType: "Universal", scope: "All partner brands", delivery: "Email", personalization: "Text message", message: "", schedule: "" });
    onNotify(form.delivery === "Physical" ? "Gift card created and awaiting POS activation" : "Gift card issued and delivery queued", "success");
  };

  return <>
    <DataModule title="Gift Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="gift-ops-grid">
      <article className="module-workbench gift-ledger">
        <div className="section-title"><div><h2>Stored-value ledger</h2><p>Today’s liability movement and settlement position</p></div><button onClick={() => onNotify("Gift card ledger refreshed", "info")}><RefreshCw />Refresh</button></div>
        <div className="ledger-flow"><div><span>Opening liability</span><strong>PKR 17.96M</strong></div><b>+</b><div><span>Loads</span><strong>PKR 1.24M</strong></div><b>−</b><div><span>Redemptions</span><strong>PKR 780K</strong></div><b>=</b><div className="ledger-total"><span>Current liability</span><strong>PKR 18.42M</strong></div></div>
      </article>
      <article className="module-workbench gift-controls">
        <div className="section-title"><div><h2>Gift card policy</h2><p>Applied to all closed-loop and multi-merchant vouchers</p></div><ShieldCheck /></div>
        <div className="gift-control-list"><span><i />Partial redemption enabled</span><span><i />12-month validity</span><span><i />7-day refund if unredeemed</span><span><i />12-digit code + 4-digit security PIN</span></div>
      </article>
    </section>
    {open && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="action-modal gift-issue-modal" role="dialog" aria-modal="true" aria-labelledby="gift-issue-title" onMouseDown={event => event.stopPropagation()}>
      <div className="action-modal-head"><div><h2 id="gift-issue-title">Issue gift card</h2><p>Create a Universal, Category, Occasion or Brand voucher with personalization and scheduled delivery.</p></div><button onClick={() => setOpen(false)} aria-label="Close gift card issuance"><XCircle /></button></div>
      <div className="gift-issue-layout">
        <div className="rule-form">
          <label>Recipient name<Input value={form.recipient} onChange={event => update("recipient", event.target.value)} placeholder="Full name or company" autoFocus /></label>
          <label>Email or mobile<Input value={form.contact} onChange={event => update("contact", event.target.value)} placeholder="recipient@example.com" /></label>
          <label>Purchaser / sponsor<Input value={form.purchaser} onChange={event => update("purchaser", event.target.value)} placeholder="Name or corporate client" /></label>
          <label>Card type<select value={form.cardType} onChange={event => { const value = event.target.value; update("cardType", value); update("scope", value === "Universal" ? "All partner brands" : value === "Category" ? "Food & dining" : value === "Occasion" ? "Birthday collection" : "Ideas Home"); }}><option>Universal</option><option>Category</option><option>Occasion</option><option>Brand</option></select></label>
          <label>Acceptance scope<select value={form.scope} onChange={event => update("scope", event.target.value)}>{form.cardType === "Universal" && <option>All partner brands</option>}{form.cardType === "Category" && <><option>Food & dining</option><option>Fashion</option><option>Home & lifestyle</option><option>Travel & entertainment</option></>}{form.cardType === "Occasion" && <><option>Birthday collection</option><option>Wedding collection</option><option>Eid collection</option><option>Congratulations</option></>}{form.cardType === "Brand" && <><option>Ideas Home</option><option>Broadway Pizza</option><option>Sapphire</option><option>Bookme</option></>}</select></label>
          <label>Delivery<select value={form.delivery} onChange={event => update("delivery", event.target.value)}><option>Email</option><option>SMS</option><option>Physical</option></select></label>
          <label>Load amount (PKR)<Input type="number" min="1000" max="50000" value={form.amount} onChange={event => update("amount", event.target.value)} placeholder="1,000 – 50,000" /></label>
          <label>Delivery date & time<Input type="datetime-local" value={form.schedule} onChange={event => update("schedule", event.target.value)} /></label>
          <label>Personalization<select value={form.personalization} onChange={event => update("personalization", event.target.value)}><option>Text message</option><option>Voice greeting</option><option>Video greeting</option><option>None</option></select></label>
          <label className="wide">Personal message<textarea value={form.message} onChange={event => update("message", event.target.value)} placeholder="Optional message for the recipient" /></label>
          <div className="rule-summary"><Gift /><div><strong>Partial redemption with refund protection</strong><span>Valid for 12 months. Unredeemed vouchers may be refunded within 7 days. The recipient receives a 12-digit voucher number and 4-digit security code.</span></div></div>
          <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.recipient.trim() || !form.contact.trim() || !form.purchaser.trim() || !validAmount} onClick={issueGiftCard}><Send />Issue gift card</Button></footer>
        </div>
      </div>
    </section></div>}
  </>;
}

function MerchantNetworkModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Merchant Network"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ brand: "", category: "Fashion", outlets: "", channel: "POS + Online", commission: "", settlement: "T+2" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const addMerchant = () => {
    setRows(current => [{ brand: form.brand.trim(), category: form.category, outlets: form.outlets, channel: form.channel, commercial: `${form.commission}%`, settlement: form.settlement, status: "Pilot" }, ...current]);
    setOpen(false);
    setForm({ brand: "", category: "Fashion", outlets: "", channel: "POS + Online", commission: "", settlement: "T+2" });
    onNotify("Merchant added to onboarding as Pilot", "success");
  };
  return <>
    <DataModule title="Merchant Network" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="merchant-channel-grid">{[
      { name: "POS API", detail: "Real-time voucher + PIN validation", icon: Wifi }, { name: "Cashier portal", detail: "Browser redemption for partner stores", icon: Store },
      { name: "QR redemption", detail: "Scan and confirm at checkout", icon: QrCode }, { name: "Online code", detail: "GK-number-PIN in coupon field", icon: Network },
    ].map(item => <article className="module-workbench channel-card" key={item.name}><span><item.icon /></span><div><strong>{item.name}</strong><small>{item.detail}</small></div><b>Live</b></article>)}</section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Add merchant partner</h2><p>Configure redemption eligibility, commercial terms and settlement before pilot activation.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label className="wide">Brand name<Input value={form.brand} onChange={event => update("brand", event.target.value)} placeholder="e.g. Partner Brand" autoFocus /></label>
      <label>Category<select value={form.category} onChange={event => update("category", event.target.value)}><option>Fashion</option><option>Food & dining</option><option>Home & lifestyle</option><option>Travel & entertainment</option><option>Beauty</option></select></label>
      <label>Outlet count<Input type="number" min="1" value={form.outlets} onChange={event => update("outlets", event.target.value)} placeholder="e.g. 25" /></label>
      <label>Redemption channel<select value={form.channel} onChange={event => update("channel", event.target.value)}><option>POS + Online</option><option>POS + QR</option><option>Cashier portal</option><option>Online code</option></select></label>
      <label>Commission (%)<Input type="number" min="0" max="100" step="0.1" value={form.commission} onChange={event => update("commission", event.target.value)} placeholder="e.g. 4.5" /></label>
      <label className="wide">Settlement cycle<select value={form.settlement} onChange={event => update("settlement", event.target.value)}><option>T+1</option><option>T+2</option><option>Weekly</option><option>Monthly</option></select></label>
      <div className="rule-summary"><Store /><div><strong>Merchant credential provisioning</strong><span>On approval, Qubits will issue scoped redemption credentials and include the merchant in eligible gift-card networks.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.brand.trim() || !form.outlets || !form.commission} onClick={addMerchant}>Add merchant</Button></footer>
    </div></section></div>}
  </>;
}

function CorporateGiftingModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Corporate Gifting"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({ name: "", client: "", purpose: "Employee reward", cardType: "Universal", recipients: "", amount: "", delivery: "Email + SMS", schedule: "", procurement: "Purchase order" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const createCampaign = () => {
    const total = Number(form.recipients) * Number(form.amount);
    setRows(current => [{ campaign: form.name.trim(), client: form.client.trim(), purpose: form.purpose, recipients: Number(form.recipients).toLocaleString(), value: `PKR ${total.toLocaleString()}`, delivery: form.schedule ? `Scheduled · ${form.delivery}` : form.delivery, status: "Draft" }, ...current]);
    setOpen(false); setFileName("");
    setForm({ name: "", client: "", purpose: "Employee reward", cardType: "Universal", recipients: "", amount: "", delivery: "Email + SMS", schedule: "", procurement: "Purchase order" });
    onNotify("Corporate campaign created as Draft", "success");
  };
  return <>
    <DataModule title="Corporate Gifting" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="gift-ops-grid"><article className="module-workbench gift-ledger"><div className="section-title"><div><h2>Campaign lifecycle</h2><p>Controlled from procurement to reconciliation</p></div><Building2 /></div><div className="campaign-steps"><span><b>1</b>PO / funding</span><span><b>2</b>Recipient validation</span><span><b>3</b>Approval</span><span><b>4</b>Scheduled delivery</span><span><b>5</b>Utilization report</span></div></article><article className="module-workbench gift-controls"><div className="section-title"><div><h2>Enterprise options</h2><p>Available per campaign</p></div><PackageCheck /></div><div className="gift-control-list"><span><i />Custom branding</span><span><i />CSV recipient upload</span><span><i />Personalized messages</span><span><i />Corporate invoice & PO</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Create corporate campaign</h2><p>Build, personalize and schedule a controlled bulk gift-card issuance.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label>Campaign name<Input value={form.name} onChange={event => update("name", event.target.value)} placeholder="e.g. Eid Rewards" autoFocus /></label><label>Corporate client<Input value={form.client} onChange={event => update("client", event.target.value)} placeholder="Legal or trading name" /></label>
      <label>Purpose<select value={form.purpose} onChange={event => update("purpose", event.target.value)}><option>Employee reward</option><option>Customer onboarding</option><option>Distributor incentive</option><option>Loyalty campaign</option></select></label><label>Card type<select value={form.cardType} onChange={event => update("cardType", event.target.value)}><option>Universal</option><option>Category</option><option>Occasion</option><option>Brand</option></select></label>
      <label>Recipient count<Input type="number" min="1" value={form.recipients} onChange={event => update("recipients", event.target.value)} placeholder="e.g. 500" /></label><label>Amount per recipient (PKR)<Input type="number" min="1000" max="50000" value={form.amount} onChange={event => update("amount", event.target.value)} placeholder="1,000 – 50,000" /></label>
      <label>Delivery<select value={form.delivery} onChange={event => update("delivery", event.target.value)}><option>Email + SMS</option><option>Email</option><option>SMS</option><option>Physical cards</option></select></label><label>Schedule<Input type="datetime-local" value={form.schedule} onChange={event => update("schedule", event.target.value)} /></label>
      <label>Procurement<select value={form.procurement} onChange={event => update("procurement", event.target.value)}><option>Purchase order</option><option>Prepaid funding</option><option>Corporate invoice</option></select></label><label>Recipient CSV<input className="native-file" type="file" accept=".csv" onChange={event => setFileName(event.target.files?.[0]?.name || "")} /><small>{fileName || "CSV with name, mobile/email and personalized message"}</small></label>
      <div className="rule-summary"><CalendarClock /><div><strong>{form.procurement} · maker-checker approval</strong><span>Recipient validation, duplicate detection and high-value approval run before the scheduled delivery.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.name.trim() || !form.client.trim() || Number(form.recipients) < 1 || Number(form.amount) < 1000 || Number(form.amount) > 50000} onClick={createCampaign}>Create campaign</Button></footer>
    </div></section></div>}
  </>;
}

function RedemptionsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules.Redemptions;
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ voucher: "", pin: "", merchant: "Ideas Home · Clifton", channel: "POS API", amount: "" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const process = () => {
    setRows(current => [{ time: new Date().toLocaleTimeString("en-GB"), voucher: `GK-•••• •••• ${form.voucher.slice(-4)}`, merchant: form.merchant, channel: form.channel, amount: `PKR ${Number(form.amount).toLocaleString()}`, remaining: "Balance updated", status: "Approved" }, ...current]);
    setOpen(false); setForm({ voucher: "", pin: "", merchant: "Ideas Home · Clifton", channel: "POS API", amount: "" });
    onNotify("Redemption approved and merchant settlement posted", "success");
  };
  return <>
    <DataModule title="Redemptions" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks"><article><ShieldCheck /><div><strong>Balance validation</strong><span>Real-time stored-value check</span></div></article><article><Store /><div><strong>Merchant eligibility</strong><span>Brand, category and branch scope</span></div></article><article><CircleDollarSign /><div><strong>Split tender</strong><span>Use remaining balance, pay the rest</span></div></article><article><RefreshCw /><div><strong>Reversal support</strong><span>Idempotent void and refund</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Process gift-card redemption</h2><p>Validate the 12-digit voucher and 4-digit security code against merchant eligibility and available balance.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label>Voucher number<Input inputMode="numeric" value={form.voucher} onChange={event => update("voucher", event.target.value.replace(/\D/g, "").slice(0, 12))} placeholder="12 digits" autoFocus /></label><label>Security code<Input inputMode="numeric" type="password" value={form.pin} onChange={event => update("pin", event.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="4 digits" /></label>
      <label>Merchant<select value={form.merchant} onChange={event => update("merchant", event.target.value)}><option>Ideas Home · Clifton</option><option>Broadway Pizza · DHA</option><option>Sapphire Online</option><option>Bookme</option></select></label><label>Channel<select value={form.channel} onChange={event => update("channel", event.target.value)}><option>POS API</option><option>Cashier portal</option><option>QR</option><option>Online code</option></select></label>
      <label className="wide">Redemption amount (PKR)<Input type="number" min="1" value={form.amount} onChange={event => update("amount", event.target.value)} placeholder="Enter sale amount" /></label>
      <div className="rule-summary"><QrCode /><div><strong>Partial redemption and split tender</strong><span>If the sale exceeds the available voucher balance, the full remaining balance can be redeemed and the merchant can collect the difference separately.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={form.voucher.length !== 12 || form.pin.length !== 4 || Number(form.amount) <= 0} onClick={process}>Authorize redemption</Button></footer>
    </div></section></div>}
  </>;
}

function FuelCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Fuel Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    company: "", driver: "", vehicle: "", fuelType: "Petrol & diesel",
    monthlyLimit: "", dailyLimit: "", stationScope: "All domestic fuel stations",
  });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const validLimits = Number(form.monthlyLimit) > 0 && Number(form.dailyLimit) > 0 && Number(form.dailyLimit) <= Number(form.monthlyLimit);
  const issueFuelCard = () => {
    const suffix = String(8800 + rows.length * 29).slice(-4);
    const available = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(form.monthlyLimit));
    setRows(current => [{
      card: `4821 •••• ${suffix}`,
      company: `${form.company.trim()} · ${form.driver.trim()}`,
      vehicle: form.vehicle.trim().toUpperCase(),
      fuel: form.fuelType,
      available: `PKR ${available}`,
      lastUse: "Awaiting first use",
      status: "Awaiting activation",
    }, ...current]);
    setOpen(false);
    setForm({ company: "", driver: "", vehicle: "", fuelType: "Petrol & diesel", monthlyLimit: "", dailyLimit: "", stationScope: "All domestic fuel stations" });
    onNotify("Fuel card issued with fuel-station-only restrictions", "success");
  };

  return <>
    <DataModule title="Fuel Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="fuel-ops-grid">
      <article className="module-workbench fuel-acceptance">
        <div className="section-title"><div><h2>Acceptance controls</h2><p>Authorization rules applied before checking the available prepaid balance</p></div><Fuel /></div>
        <div className="acceptance-rules">
          <div><span><Fuel /></span><strong>Fuel merchants only</strong><small>MCC 5541 service stations and MCC 5542 automated fuel dispensers</small></div>
          <div><span><ShieldCheck /></span><strong>Domestic POS only</strong><small>POS and contactless are allowed; ATM, e-commerce, cash-out and P2P are blocked</small></div>
          <div><span><CarFront /></span><strong>Vehicle-linked</strong><small>Registration, driver, fuel type and optional odometer validation</small></div>
        </div>
      </article>
      <article className="module-workbench fuel-limits">
        <div className="section-title"><div><h2>Fleet policy</h2><p>Fleet Fuel Prepaid</p></div><button onClick={() => onNotify("Fleet policy sent for maker-checker approval", "success")}>Review policy</button></div>
        <div className="fuel-policy-list"><span>Per transaction<strong>PKR 25,000</strong></span><span>Daily card limit<strong>PKR 50,000</strong></span><span>Monthly card limit<strong>PKR 250,000</strong></span><span>Geography<strong>Pakistan only</strong></span></div>
      </article>
    </section>
    {open && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="action-modal fuel-issue-modal" role="dialog" aria-modal="true" aria-labelledby="fuel-issue-title" onMouseDown={event => event.stopPropagation()}>
      <div className="action-modal-head"><div><h2 id="fuel-issue-title">Issue prepaid fuel card</h2><p>The card will be usable only at qualifying fuel stations and will start in Awaiting activation.</p></div><button onClick={() => setOpen(false)} aria-label="Close fuel card issuance"><XCircle /></button></div>
      <div className="rule-form">
        <label>Company / fleet owner<Input value={form.company} onChange={event => update("company", event.target.value)} placeholder="e.g. Metro Logistics" autoFocus /></label>
        <label>Driver or card label<Input value={form.driver} onChange={event => update("driver", event.target.value)} placeholder="Driver name or Pool Car" /></label>
        <label>Vehicle registration<Input value={form.vehicle} onChange={event => update("vehicle", event.target.value)} placeholder="e.g. KHI-4821" /></label>
        <label>Allowed fuel<select value={form.fuelType} onChange={event => update("fuelType", event.target.value)}><option>Petrol & diesel</option><option>Petrol only</option><option>Diesel only</option><option>CNG only</option></select></label>
        <label>Monthly prepaid limit (PKR)<Input type="number" min="1" value={form.monthlyLimit} onChange={event => update("monthlyLimit", event.target.value)} placeholder="e.g. 250000" /></label>
        <label>Daily limit (PKR)<Input type="number" min="1" value={form.dailyLimit} onChange={event => update("dailyLimit", event.target.value)} placeholder="e.g. 50000" /></label>
        <label className="wide">Fuel station scope<select value={form.stationScope} onChange={event => update("stationScope", event.target.value)}><option>All domestic fuel stations</option><option>Approved merchant allowlist only</option><option>Company-nominated stations only</option></select></label>
        <div className="rule-summary fuel-summary"><Fuel /><div><strong>Fuel-pump acceptance only</strong><span>Transactions are approved only when MCC is 5541 or 5542 and the merchant passes the configured station scope. All non-fuel merchant transactions are declined.</span></div></div>
        <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.company.trim() || !form.driver.trim() || !form.vehicle.trim() || !validLimits} onClick={issueFuelCard}><Plus />Issue fuel card</Button></footer>
      </div>
    </section></div>}
  </>;
}

function EmployeeCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Employee Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ employee: "", employeeId: "", company: "", costCentre: "", plan: "Meal & wellness", allocation: "", cycle: "Monthly", unusedValue: "Rollover", acceptance: "Configured benefit MCCs", formFactor: "Virtual & physical" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const issue = () => {
    const suffix = String(3200 + rows.length * 37).slice(-4);
    setRows(current => [{ card: `4821 •••• ${suffix}`, employee: `${form.employee.trim()} · ${form.employeeId.trim()}`, company: `${form.company.trim()} · ${form.costCentre.trim()}`, benefit: form.plan, available: `PKR ${Number(form.allocation).toLocaleString()}`, cycle: `${form.cycle} · ${form.unusedValue}`, status: "Awaiting activation" }, ...current]);
    setOpen(false);
    setForm({ employee: "", employeeId: "", company: "", costCentre: "", plan: "Meal & wellness", allocation: "", cycle: "Monthly", unusedValue: "Rollover", acceptance: "Configured benefit MCCs", formFactor: "Virtual & physical" });
    onNotify("Employee card issued with allowance controls", "success");
  };
  return <>
    <DataModule title="Employee Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks"><article><Building2 /><div><strong>Employer funded</strong><span>Central funding with employee allocation ledgers</span></div></article><article><CalendarClock /><div><strong>Recurring allocation</strong><span>Monthly, quarterly, annual or one-time</span></div></article><article><SlidersHorizontal /><div><strong>Benefit controls</strong><span>MCC, channel, geography and usage schedule</span></div></article><article><UserCheck /><div><strong>HR lifecycle</strong><span>Automatic hold when employment status changes</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Issue employee allowance card</h2><p>Link an employee to an employer-funded benefit plan and its allocation policy.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label>Employee name<Input value={form.employee} onChange={event => update("employee", event.target.value)} placeholder="Employee name" autoFocus /></label><label>Employee ID<Input value={form.employeeId} onChange={event => update("employeeId", event.target.value)} placeholder="e.g. EMP-1084" /></label>
      <label>Company<Input value={form.company} onChange={event => update("company", event.target.value)} placeholder="Employer" /></label><label>Department / cost centre<Input value={form.costCentre} onChange={event => update("costCentre", event.target.value)} placeholder="e.g. ENG-01" /></label>
      <label>Allowance plan<select value={form.plan} onChange={event => update("plan", event.target.value)}><option>Meal & wellness</option><option>Travel allowance</option><option>Fuel allowance</option><option>Healthcare benefit</option><option>Flexible benefits</option></select></label><label>Allocation amount (PKR)<Input type="number" min="1" value={form.allocation} onChange={event => update("allocation", event.target.value)} placeholder="e.g. 30000" /></label>
      <label>Allocation cycle<select value={form.cycle} onChange={event => update("cycle", event.target.value)}><option>Monthly</option><option>Quarterly</option><option>Annual</option><option>One-time</option></select></label><label>Unused value<select value={form.unusedValue} onChange={event => update("unusedValue", event.target.value)}><option>Rollover</option><option>Expire</option><option>Return to company pool</option></select></label>
      <label>Acceptance policy<select value={form.acceptance} onChange={event => update("acceptance", event.target.value)}><option>Configured benefit MCCs</option><option>Approved merchant allowlist</option><option>Domestic POS only</option><option>Company policy profile</option></select></label><label>Form factor<select value={form.formFactor} onChange={event => update("formFactor", event.target.value)}><option>Virtual & physical</option><option>Virtual only</option><option>Physical only</option></select></label>
      <div className="rule-summary"><UserCheck /><div><strong>HRMS-ready benefit card</strong><span>Payroll files, HRMS APIs and bulk allocations can update balances. Employment status changes can automatically suspend usage.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.employee.trim() || !form.employeeId.trim() || !form.company.trim() || !form.costCentre.trim() || Number(form.allocation) <= 0} onClick={issue}>Issue employee card</Button></footer>
    </div></section></div>}
  </>;
}

function ExpenseCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Expense Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ holder: "", purpose: "Department spending", costCentre: "", cardMode: "Named physical + virtual", budget: "", transactionLimit: "", merchantPolicy: "Business expense MCC profile", evidence: "Receipt and business purpose", accountingCode: "" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const issue = () => {
    const virtual = /virtual|single-use|vendor/i.test(form.cardMode);
    const card = virtual ? `VC-EXP-${84020 + rows.length}` : `4821 •••• ${String(6100 + rows.length * 43).slice(-4)}`;
    setRows(current => [{ card, holder: `${form.holder.trim()} · ${form.purpose}`, costCentre: `${form.costCentre.trim()} · ${form.accountingCode.trim()}`, control: `${form.merchantPolicy} · PKR ${Number(form.transactionLimit).toLocaleString()}/txn`, budget: `PKR ${Number(form.budget).toLocaleString()}`, evidence: form.evidence, status: "Draft" }, ...current]);
    setOpen(false);
    setForm({ holder: "", purpose: "Department spending", costCentre: "", cardMode: "Named physical + virtual", budget: "", transactionLimit: "", merchantPolicy: "Business expense MCC profile", evidence: "Receipt and business purpose", accountingCode: "" });
    onNotify("Expense card created with budget and reconciliation controls", "success");
  };
  return <>
    <DataModule title="Expense Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks"><article><CircleDollarSign /><div><strong>Budget enforcement</strong><span>Transaction, monthly, project and trip limits</span></div></article><article><Store /><div><strong>Merchant policy</strong><span>MCC, merchant, geography and currency controls</span></div></article><article><FileCheck2 /><div><strong>Evidence workflow</strong><span>Receipt, purpose and manager approval</span></div></article><article><RefreshCw /><div><strong>ERP reconciliation</strong><span>Cost-centre and GL-coded export</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Issue corporate expense card</h2><p>Create a controlled physical or virtual card tied to budget, accounting and evidence rules.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label>Employee / department<Input value={form.holder} onChange={event => update("holder", event.target.value)} placeholder="Cardholder or team" autoFocus /></label><label>Purpose<select value={form.purpose} onChange={event => update("purpose", event.target.value)}><option>Department spending</option><option>Business travel</option><option>Procurement</option><option>Subscriptions</option><option>Petty cash</option><option>Project budget</option></select></label>
      <label>Cost centre<Input value={form.costCentre} onChange={event => update("costCentre", event.target.value)} placeholder="e.g. TECH-210" /></label><label>ERP / GL code<Input value={form.accountingCode} onChange={event => update("accountingCode", event.target.value)} placeholder="e.g. 641200" /></label>
      <label>Card mode<select value={form.cardMode} onChange={event => update("cardMode", event.target.value)}><option>Named physical + virtual</option><option>Department card</option><option>Reusable virtual</option><option>Single-use virtual</option><option>Vendor-locked virtual</option></select></label><label>Merchant policy<select value={form.merchantPolicy} onChange={event => update("merchantPolicy", event.target.value)}><option>Business expense MCC profile</option><option>Travel MCCs only</option><option>Approved vendor allowlist</option><option>Single named merchant</option><option>Domestic POS only</option></select></label>
      <label>Monthly / trip budget (PKR)<Input type="number" min="1" value={form.budget} onChange={event => update("budget", event.target.value)} /></label><label>Per-transaction limit (PKR)<Input type="number" min="1" value={form.transactionLimit} onChange={event => update("transactionLimit", event.target.value)} /></label>
      <label className="wide">Evidence requirement<select value={form.evidence} onChange={event => update("evidence", event.target.value)}><option>Receipt and business purpose</option><option>Receipt only</option><option>Manager pre-approval</option><option>Trip approval and receipt</option><option>Invoice auto-match</option></select></label>
      <div className="rule-summary"><FileCheck2 /><div><strong>Authorization-to-accounting workflow</strong><span>Policy exceptions, missing receipts and duplicate expenses enter review queues before approved entries are posted to ERP.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.holder.trim() || !form.costCentre.trim() || !form.accountingCode.trim() || Number(form.budget) <= 0 || Number(form.transactionLimit) <= 0} onClick={issue}>Create expense card</Button></footer>
    </div></section></div>}
  </>;
}

function WalletCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Wallet Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", walletId: "", kyc: "Full", credential: "Instant virtual", dailyLimit: "", channels: "POS · E-commerce · Token", atm: "Disabled", international: "Disabled", authentication: "Device binding + OTP" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const issue = () => {
    const physical = form.credential.includes("Physical");
    const card = physical ? `4821 •••• ${String(7000 + rows.length * 31).slice(-4)}` : `VC-${84920500 + rows.length}`;
    const extraChannels = [form.channels, form.atm === "Enabled" ? "ATM" : "", form.international === "Enabled" ? "International" : ""].filter(Boolean).join(" · ");
    setRows(current => [{ card, customer: `${form.customer.trim()} · ${form.walletId.trim()}`, credential: form.credential, channels: extraChannels, balance: "Wallet ledger", kyc: form.kyc, status: physical ? "Awaiting fulfilment" : "Active" }, ...current]);
    setOpen(false);
    setForm({ customer: "", walletId: "", kyc: "Full", credential: "Instant virtual", dailyLimit: "", channels: "POS · E-commerce · Token", atm: "Disabled", international: "Disabled", authentication: "Device binding + OTP" });
    onNotify("Wallet-linked card issued and balance routing enabled", "success");
  };
  return <>
    <DataModule title="Wallet Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks"><article><WalletCards /><div><strong>Live wallet balance</strong><span>Wallet ledger is the card funding source</span></div></article><article><Fingerprint /><div><strong>Instant eligibility</strong><span>Virtual issuance based on KYC tier</span></div></article><article><Smartphone /><div><strong>In-app lifecycle</strong><span>PIN, freeze, limits and transaction history</span></div></article><article><ShieldCheck /><div><strong>Secure actions</strong><span>Device binding, OTP and step-up authentication</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Issue wallet-linked card</h2><p>Connect a physical or virtual credential to the customer’s real-time wallet balance.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label>Customer<Input value={form.customer} onChange={event => update("customer", event.target.value)} placeholder="Customer name or CNIC" autoFocus /></label><label>Wallet ID<Input value={form.walletId} onChange={event => update("walletId", event.target.value)} placeholder="e.g. WAL-1842" /></label>
      <label>KYC tier<select value={form.kyc} onChange={event => update("kyc", event.target.value)}><option>Basic</option><option>Full</option><option>Enhanced</option></select></label><label>Credential<select value={form.credential} onChange={event => update("credential", event.target.value)}><option>Instant virtual</option><option>Physical + virtual</option><option>Numberless physical + virtual</option></select></label>
      <label>Base channels<select value={form.channels} onChange={event => update("channels", event.target.value)}><option>POS · E-commerce · Token</option><option>Domestic POS · E-commerce</option><option>POS · Contactless</option><option>E-commerce only</option></select></label><label>Daily limit (PKR)<Input type="number" min="1" value={form.dailyLimit} onChange={event => update("dailyLimit", event.target.value)} placeholder="e.g. 100000" /></label>
      <label>ATM access<select value={form.atm} onChange={event => update("atm", event.target.value)}><option>Disabled</option><option>Enabled</option></select></label><label>International usage<select value={form.international} onChange={event => update("international", event.target.value)}><option>Disabled</option><option>Enabled</option></select></label>
      <label className="wide">Sensitive-action authentication<select value={form.authentication} onChange={event => update("authentication", event.target.value)}><option>Device binding + OTP</option><option>Biometric + device binding</option><option>Passcode + OTP</option></select></label>
      <div className="rule-summary"><Smartphone /><div><strong>KYC-aware channel controls</strong><span>ATM and international access remain subject to program policy, KYC eligibility and available wallet balance at authorization time.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.customer.trim() || !form.walletId.trim() || Number(form.dailyLimit) <= 0} onClick={issue}>Issue wallet card</Button></footer>
    </div></section></div>}
  </>;
}

function HybridCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Hybrid Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ holder: "", card: "Physical + virtual", primary: "Primary debit", secondary: "Credit line", third: "Travel wallet", routing: "Cardholder + automatic", currencies: "PKR · USD · AED" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const create = () => {
    const suffix = String(4300 + rows.length * 41).slice(-4);
    setRows(current => [{ card: `4821 •••• ${suffix}`, holder: form.holder.trim(), accounts: [form.primary, form.secondary, form.third].filter(item => item && item !== "None").join(" · "), default: form.primary, routing: form.routing, currencies: form.currencies, status: "Draft" }, ...current]);
    setOpen(false);
    setForm({ holder: "", card: "Physical + virtual", primary: "Primary debit", secondary: "Credit line", third: "Travel wallet", routing: "Cardholder + automatic", currencies: "PKR · USD · AED" });
    onNotify("Hybrid card created with linked funding sources", "success");
  };
  return <>
    <DataModule title="Hybrid Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="hybrid-flow-grid">
      <article className="module-workbench hybrid-visual"><div className="section-title"><div><h2>Funding source routing</h2><p>One credential, multiple real-time balances</p></div><Repeat2 /></div><div className="hybrid-route"><span>Hybrid card</span><ArrowRight /><div><b>Debit</b><b>Credit</b><b>Fuel</b><b>Expense</b><b>FX wallet</b></div></div></article>
      <article className="module-workbench gift-controls"><div className="section-title"><div><h2>Supported decisions</h2><p>Configured per programme</p></div><Route /></div><div className="gift-control-list"><span><i />Cardholder-selected account</span><span><i />Automatic MCC routing</span><span><i />Currency wallet match</span><span><i />Balance-aware fallback</span></div></article>
    </section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Create hybrid card</h2><p>Link multiple funding accounts to one card and select how each authorization chooses its source.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label className="wide">Cardholder<Input value={form.holder} onChange={event => update("holder", event.target.value)} placeholder="Search customer or employee" autoFocus /></label>
      <label>Credential<select value={form.card} onChange={event => update("card", event.target.value)}><option>Physical + virtual</option><option>Virtual only</option><option>Numberless physical</option></select></label><label>Routing mode<select value={form.routing} onChange={event => update("routing", event.target.value)}><option>Cardholder + automatic</option><option>Policy based</option><option>Cardholder controlled</option></select></label>
      <label>Primary account<select value={form.primary} onChange={event => update("primary", event.target.value)}><option>Primary debit</option><option>Credit line</option><option>Prepaid wallet</option><option>Corporate account</option></select></label><label>Second account<select value={form.secondary} onChange={event => update("secondary", event.target.value)}><option>Credit line</option><option>Fuel allowance</option><option>Expense budget</option><option>Rewards wallet</option></select></label>
      <label>Third account<select value={form.third} onChange={event => update("third", event.target.value)}><option>Travel wallet</option><option>Fuel allowance</option><option>Healthcare benefit</option><option>None</option></select></label><label>Currencies<select value={form.currencies} onChange={event => update("currencies", event.target.value)}><option>PKR</option><option>PKR · USD</option><option>PKR · USD · AED</option><option>PKR · USD · EUR · GBP</option></select></label>
      <div className="rule-summary"><Repeat2 /><div><strong>Hybrid funding relationship</strong><span>The card will begin as Draft. Account ownership, currency and fallback rules must pass maker-checker validation before activation.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.holder.trim()} onClick={create}>Create hybrid card</Button></footer>
    </div></section></div>}
  </>;
}

function DigitalCardsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Digital Cards"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ holder: "", type: "Numberless physical", security: "Biometric PAN/CVV", wallet: "Apple Pay + Google Wallet", validity: "36 months", merchant: "" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const issue = () => {
    const prefix = form.type === "One-time virtual" ? "OT" : form.type === "Merchant locked" ? "ML" : form.type === "Reusable virtual" ? "VC" : "DC";
    setRows(current => [{ credential: `${prefix}-${84921000 + rows.length}`, holder: form.holder.trim(), type: form.type, security: form.type === "Merchant locked" ? `${form.merchant || "Selected merchant"} only` : form.security, wallets: /one-time|merchant/i.test(form.type) ? "Not eligible" : form.wallet, expires: form.validity, status: form.type === "Numberless physical" ? "Awaiting fulfilment" : "Active" }, ...current]);
    setOpen(false);
    setForm({ holder: "", type: "Numberless physical", security: "Biometric PAN/CVV", wallet: "Apple Pay + Google Wallet", validity: "36 months", merchant: "" });
    onNotify("Secure digital credential issued", "success");
  };
  return <>
    <DataModule title="Digital Cards" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="digital-security-grid">{[
      { icon: Fingerprint, title: "Secure detail access", detail: "PAN and CVV revealed only after biometric or passcode verification" },
      { icon: CreditCard, title: "Numberless physical", detail: "No sensitive credentials printed on the card surface" },
      { icon: RefreshCw, title: "Instant replacement", detail: "Issue new credentials and relink eligible tokens immediately" },
      { icon: Smartphone, title: "Push provisioning", detail: "Apple Pay, Google Wallet, Samsung Pay and issuer wallets" },
    ].map(item => <article className="module-workbench channel-card" key={item.title}><span><item.icon /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><b>Enabled</b></article>)}</section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Issue digital card</h2><p>Create a secure numberless, reusable, one-time or merchant-locked credential.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label className="wide">Cardholder<Input value={form.holder} onChange={event => update("holder", event.target.value)} placeholder="Search customer or employee" autoFocus /></label>
      <label>Credential type<select value={form.type} onChange={event => { update("type", event.target.value); update("validity", event.target.value === "One-time virtual" ? "1 use · 24h" : event.target.value === "Merchant locked" ? "30 days" : "36 months"); }}><option>Numberless physical</option><option>Reusable virtual</option><option>One-time virtual</option><option>Merchant locked</option></select></label><label>Credential security<select value={form.security} onChange={event => update("security", event.target.value)}><option>Biometric PAN/CVV</option><option>Dynamic CVV</option><option>Single authorization</option><option>Passcode access</option></select></label>
      {form.type === "Merchant locked" && <label className="wide">Allowed merchant<Input value={form.merchant} onChange={event => update("merchant", event.target.value)} placeholder="Merchant name or ID" /></label>}
      <label>Wallet provisioning<select value={form.wallet} onChange={event => update("wallet", event.target.value)} disabled={/one-time|merchant/i.test(form.type)}><option>Apple Pay + Google Wallet</option><option>Google Wallet</option><option>Samsung Pay</option><option>Issuer wallet only</option><option>Not eligible</option></select></label><label>Validity<Input value={form.validity} readOnly /></label>
      <div className="rule-summary"><Fingerprint /><div><strong>Credential security</strong><span>Sensitive details are never shown without authenticated in-app access. Every reveal and provisioning action is audited.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.holder.trim() || (form.type === "Merchant locked" && !form.merchant.trim())} onClick={issue}>Issue credential</Button></footer>
    </div></section></div>}
  </>;
}

function FundingRoutingModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Funding Routing"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", trigger: "Merchant category", condition: "", source: "Fuel allowance", fallback: "Primary debit", priority: "50" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const create = () => {
    setRows(current => [{ rule: form.name.trim(), trigger: `${form.trigger}: ${form.condition}`, source: form.source, fallback: form.fallback, priority: form.priority, status: "Draft" }, ...current]);
    setOpen(false); setForm({ name: "", trigger: "Merchant category", condition: "", source: "Fuel allowance", fallback: "Primary debit", priority: "50" });
    onNotify("Funding routing rule created as Draft", "success");
  };
  return <>
    <DataModule title="Funding Routing" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    <section className="redemption-checks"><article><Route /><div><strong>Priority evaluation</strong><span>First matching active rule wins</span></div></article><article><CircleDollarSign /><div><strong>Balance aware</strong><span>Validate source before authorization</span></div></article><article><RefreshCw /><div><strong>Controlled fallback</strong><span>Alternate source or hard decline</span></div></article><article><FileText /><div><strong>Decision evidence</strong><span>Rule and source logged per event</span></div></article></section>
    {open && <div className="action-modal-backdrop" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" onMouseDown={event => event.stopPropagation()}><div className="action-modal-head"><div><h2>Create funding routing rule</h2><p>Choose the linked account used when an authorization matches the configured transaction condition.</p></div><button onClick={() => setOpen(false)}><XCircle /></button></div><div className="rule-form">
      <label className="wide">Rule name<Input value={form.name} onChange={event => update("name", event.target.value)} placeholder="e.g. Use fuel benefit at service stations" autoFocus /></label>
      <label>Trigger type<select value={form.trigger} onChange={event => update("trigger", event.target.value)}><option>Merchant category</option><option>Transaction currency</option><option>Named merchant</option><option>Approved trip</option><option>Cardholder selection</option></select></label><label>Condition<Input value={form.condition} onChange={event => update("condition", event.target.value)} placeholder="e.g. MCC 5541, 5542" /></label>
      <label>Route to<select value={form.source} onChange={event => update("source", event.target.value)}><option>Fuel allowance</option><option>Expense budget</option><option>Matching FX wallet</option><option>Credit line</option><option>Primary debit</option></select></label><label>Fallback<select value={form.fallback} onChange={event => update("fallback", event.target.value)}><option>Primary debit</option><option>Credit line</option><option>Next eligible wallet</option><option>Decline</option></select></label>
      <label className="wide">Priority<Input type="number" min="1" max="999" value={form.priority} onChange={event => update("priority", event.target.value)} /></label>
      <div className="rule-summary"><Route /><div><strong>Authorization-time decision</strong><span>The rule evaluates account eligibility, available balance and programme controls before applying the configured fallback.</span></div></div>
      <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.name.trim() || !form.condition.trim() || Number(form.priority) < 1} onClick={create}>Create routing rule</Button></footer>
    </div></section></div>}
  </>;
}

function ProgramsModule({ onNotify }: { onNotify: Notify }) {
  const base = modules["Card Programs"];
  const [rows, setRows] = useState(base.rows);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cardType: "Debit",
    segment: "Retail",
    scheme: "Visa",
    currency: "PKR",
    dailyLimit: "",
    productModel: "Universal",
    formFactor: "Virtual & physical",
    expiryMonths: "12",
    acceptanceScope: "All domestic fuel stations",
    fuelType: "Petrol & diesel",
    rewardsProfile: "No rewards",
  });
  const [binInput, setBinInput] = useState("");
  const [bins, setBins] = useState<string[]>([]);
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const validBinInput = /^\d{6,8}$/.test(binInput);
  const binExists = bins.includes(binInput);
  const validLimit = Number(form.dailyLimit) > 0;
  const isGiftCard = form.cardType === "Gift Card";
  const isFuelCard = form.cardType === "Fuel Card";
  const binRequired = !isGiftCard || form.scheme !== "Merchant network";
  const addBin = () => {
    if (!validBinInput || binExists) return;
    setBins(current => [...current, binInput]);
    setBinInput("");
  };
  const createProgram = () => {
    const formattedLimit = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(form.dailyLimit));
    const newProgram: Row = {
      program: form.name.trim(),
      type: isGiftCard ? `Gift Card · ${form.productModel}` : isFuelCard ? "Fuel Card · Prepaid" : `${form.cardType} · ${form.segment}`,
      scheme: bins.length ? `${form.scheme} · ${bins.join(", ")}` : `${form.scheme} · No BIN`,
      cards: "—",
      limit: `${form.currency} ${formattedLimit}`,
      rewards: form.rewardsProfile,
      status: "Draft",
    };
    setRows(current => [newProgram, ...current]);
    setOpen(false);
    setForm({ name: "", cardType: "Debit", segment: "Retail", scheme: "Visa", currency: "PKR", dailyLimit: "", productModel: "Universal", formFactor: "Virtual & physical", expiryMonths: "12", acceptanceScope: "All domestic fuel stations", fuelType: "Petrol & diesel", rewardsProfile: "No rewards" });
    setBinInput("");
    setBins([]);
    onNotify("Card program created and added as Draft", "success");
  };

  return <>
    <DataModule title="Card Programs" config={{ ...base, rows }} onNotify={onNotify} onPrimary={() => setOpen(true)} />
    {open && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="action-modal rule-modal" role="dialog" aria-modal="true" aria-labelledby="program-title" onMouseDown={event => event.stopPropagation()}>
      <div className="action-modal-head"><div><h2 id="program-title">Create card program</h2><p>Define the product, scheme range and default transaction limit. New programs begin in Draft.</p></div><button onClick={() => setOpen(false)} aria-label="Close card program"><XCircle /></button></div>
      <div className="rule-form">
        <label className="wide">Program name<Input value={form.name} onChange={event => update("name", event.target.value)} placeholder="e.g. Signature Debit" autoFocus /></label>
        <label>Card type<select value={form.cardType} onChange={event => { const value = event.target.value; update("cardType", value); if (value === "Gift Card") update("scheme", "Merchant network"); if (["Fuel Card", "Employee Benefit", "Corporate Expense", "Wallet-linked", "Hybrid Card", "Digital Card"].includes(value)) update("scheme", "Visa"); }}><option>Debit</option><option>Credit</option><option>Prepaid</option><option>Virtual</option><option>Commercial</option><option>Gift Card</option><option>Fuel Card</option><option>Employee Benefit</option><option>Corporate Expense</option><option>Wallet-linked</option><option>Hybrid Card</option><option>Digital Card</option></select></label>
        <label>Customer segment<select value={form.segment} onChange={event => update("segment", event.target.value)}><option>Retail</option><option>Priority</option><option>Youth</option><option>SME</option><option>Commercial</option><option>Employee</option><option>Wallet customer</option></select></label>
        {isGiftCard && <><label>Gift card model<select value={form.productModel} onChange={event => update("productModel", event.target.value)}><option>Universal</option><option>Category</option><option>Occasion</option><option>Brand</option><option>Open-loop</option><option>Corporate rewards</option></select></label><label>Form factor<select value={form.formFactor} onChange={event => update("formFactor", event.target.value)}><option>Virtual & physical</option><option>Virtual only</option><option>Physical only</option></select></label><label>Validity (months)<Input type="number" min="1" max="60" value={form.expiryMonths} onChange={event => update("expiryMonths", event.target.value)} /></label></>}
        {isFuelCard && <><label>Fuel station scope<select value={form.acceptanceScope} onChange={event => update("acceptanceScope", event.target.value)}><option>All domestic fuel stations</option><option>Approved merchant allowlist</option><option>Company-nominated stations</option></select></label><label>Allowed fuel<select value={form.fuelType} onChange={event => update("fuelType", event.target.value)}><option>Petrol & diesel</option><option>Petrol only</option><option>Diesel only</option><option>CNG only</option></select></label><label>Allowed MCCs<Input value="5541, 5542" readOnly /></label></>}
        <label>Card scheme<select value={form.scheme} onChange={event => update("scheme", event.target.value)}>{isGiftCard && <option>Merchant network</option>}<option>Visa</option><option>Mastercard</option><option>PayPak</option><option>UnionPay</option></select></label>
        <div className="bin-field"><label>BIN range {isGiftCard && form.scheme === "Merchant network" ? "(optional)" : ""}</label><div className="bin-builder"><Input value={binInput} onChange={event => setBinInput(event.target.value.replace(/\D/g, "").slice(0, 8))} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addBin(); } }} placeholder={binRequired ? "6–8 digits" : "Not required for merchant vouchers"} inputMode="numeric" disabled={!binRequired} /><Button type="button" variant="outline" disabled={!binRequired || !validBinInput || binExists} onClick={addBin}><Plus />Add BIN</Button></div>{binInput && !validBinInput && <small>Enter a 6 to 8 digit BIN.</small>}{binExists && <small>This BIN is already assigned.</small>}{!binRequired && <small className="bin-note">Universal, Category, Occasion and Brand vouchers use internal stored-value accounts and do not require a payment-scheme BIN.</small>}</div>
        {bins.length > 0 && <div className="bin-list wide"><span>Assigned BINs</span><div>{bins.map(bin => <button type="button" className="bin-chip" key={bin} onClick={() => setBins(current => current.filter(item => item !== bin))}>{bin}<XCircle /></button>)}</div></div>}
        <label>Currency<select value={form.currency} onChange={event => update("currency", event.target.value)}><option>PKR</option><option>USD</option><option>EUR</option><option>GBP</option></select></label>
        <label>{isGiftCard ? "Maximum stored value" : isFuelCard ? "Default monthly fuel limit" : "Default daily limit"}<Input type="number" min="1" value={form.dailyLimit} onChange={event => update("dailyLimit", event.target.value)} placeholder="e.g. 100000" /></label>
        <label className="wide">Rewards profile<select value={form.rewardsProfile} onChange={event => update("rewardsProfile", event.target.value)}><option>No rewards</option><option>Everyday base points</option><option>Cashback</option><option>Travel miles</option><option>Category multipliers</option><option>Merchant-funded offers</option><option>Custom reward rules</option></select></label>
        <div className="rule-summary"><WalletCards /><div><strong>Maker-checker protected draft</strong><span>{isGiftCard ? "Configure denominations, merchant scope, activation, expiry, refund and ledger accounts before approval." : isFuelCard ? "POS and contactless are allowed only for MCC 5541/5542. ATM, e-commerce, P2P, international usage and cash withdrawal are blocked." : "The program will be available for pricing, controls and eligibility configuration before approval and card issuance."}</span></div></div>
        <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.name.trim() || (binRequired && bins.length === 0) || !validLimit} onClick={createProgram}>Create as draft</Button></footer>
      </div>
    </section></div>}
  </>;
}

function ControlsModule({ onNotify }: { onNotify: Notify }) {
  const [enabled, setEnabled] = useState(controlRules.map(rule => rule.enabled));
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policies, setPolicies] = useState<Array<{ name: string; detail: string; scope: string; enabled: boolean }>>([]);
  const [policy, setPolicy] = useState({ name: "", channel: "E-commerce", scope: "All card programs", condition: "", response: "Decline transaction" });
  const updatePolicy = (key: keyof typeof policy, value: string) => setPolicy(current => ({ ...current, [key]: value }));
  const config: ModuleConfig = {
    description: "Set portfolio, program and customer-level transaction controls with maker-checker governance.",
    primary: "New control policy",
    metrics: [
      { label: "Active policies", value: "38", detail: "Across 14 programs" },
      { label: "Overrides today", value: "126", detail: "98 customer initiated", tone: "blue" },
      { label: "Declines prevented", value: "1,842", detail: "By smart limits", tone: "green" },
      { label: "Pending approvals", value: "5", detail: "Maker-checker queue", tone: "amber" },
    ], columns: [], rows: [], filters: [],
  };
  return <>
    <ModuleHeader title="Controls & Limits" config={config} onNotify={onNotify} onPrimary={() => setPolicyOpen(true)} /><ModuleMetrics metrics={config.metrics} />
    <section className="controls-layout">
      <article className="module-workbench rules-panel"><div className="section-title"><div><h2>Transaction control policies</h2><p>Changes require approval before reaching production.</p></div><button><SlidersHorizontal />Program: All</button></div>
        <div className="rule-list">{policies.map((rule, index) => <div className="rule-row new-policy" key={rule.name}><span className="rule-icon"><SlidersHorizontal /></span><div><strong>{rule.name}<em>New</em></strong><small>{rule.detail}</small></div><span className="rule-scope">{rule.scope}</span><Switch checked={rule.enabled} onCheckedChange={value => setPolicies(current => current.map((item, i) => i === index ? { ...item, enabled: value } : item))} /></div>)}{controlRules.map((rule, index) => <div className="rule-row" key={rule.name}><span className="rule-icon"><ShieldCheck /></span><div><strong>{rule.name}</strong><small>{rule.detail}</small></div><span className="rule-scope">{rule.scope}</span><Switch checked={enabled[index]} onCheckedChange={(value) => setEnabled(current => current.map((item, i) => i === index ? value : item))} /></div>)}</div>
      </article>
      <aside className="limit-builder"><div className="section-title"><div><h2>Default limits</h2><p>Platinum Debit</p></div><button><MoreHorizontal /></button></div>
        {[["POS purchases","250,000"],["E-commerce","150,000"],["ATM withdrawal","100,000"],["Contactless","25,000"]].map(([name,value]) => <label key={name}><span>{name}<small>Daily limit · PKR</small></span><input defaultValue={value} /></label>)}
        <Button onClick={() => onNotify("Limit changes submitted for approval", "success")}>Submit for approval</Button>
      </aside>
    </section>
    {policyOpen && <div className="action-modal-backdrop" role="presentation" onMouseDown={() => setPolicyOpen(false)}><section className="action-modal rule-modal" role="dialog" aria-modal="true" aria-labelledby="control-policy-title" onMouseDown={event => event.stopPropagation()}>
      <div className="action-modal-head"><div><h2 id="control-policy-title">New control policy</h2><p>Create a channel or transaction policy and submit it through maker-checker governance.</p></div><button onClick={() => setPolicyOpen(false)} aria-label="Close control policy"><XCircle /></button></div>
      <div className="rule-form">
        <label className="wide">Policy name<Input value={policy.name} onChange={event => updatePolicy("name", event.target.value)} placeholder="e.g. International e-commerce guard" /></label>
        <label>Channel<select value={policy.channel} onChange={event => updatePolicy("channel", event.target.value)}><option>E-commerce</option><option>POS</option><option>ATM</option><option>Contactless</option><option>Wallet token</option></select></label>
        <label>Scope<select value={policy.scope} onChange={event => updatePolicy("scope", event.target.value)}><option>All card programs</option><option>Retail debit</option><option>Credit cards</option><option>Business expense</option><option>Virtual and prepaid</option></select></label>
        <label className="wide">Condition<Input value={policy.condition} onChange={event => updatePolicy("condition", event.target.value)} placeholder="e.g. Transaction country differs from home country" /></label>
        <label className="wide">Enforcement response<select value={policy.response} onChange={event => updatePolicy("response", event.target.value)}><option>Decline transaction</option><option>Require step-up authentication</option><option>Apply lower limit</option><option>Notify customer</option><option>Monitor only</option></select></label>
        <div className="rule-summary"><LockKeyhole /><div><strong>Maker-checker protected</strong><span>The policy will appear enabled in this prototype and require approval before a production rollout.</span></div></div>
        <footer><Button variant="outline" onClick={() => setPolicyOpen(false)}>Cancel</Button><Button disabled={!policy.name.trim() || !policy.condition.trim()} onClick={() => { setPolicies(current => [{ name: policy.name, detail: `${policy.channel}: ${policy.condition} → ${policy.response}`, scope: policy.scope, enabled: true }, ...current]); setPolicyOpen(false); setPolicy({ name: "", channel: "E-commerce", scope: "All card programs", condition: "", response: "Decline transaction" }); onNotify("Control policy created and added to the active list", "success"); }}>Create policy</Button></footer>
      </div>
    </section></div>}
  </>;
}

function ConfigurationModule({ onNotify }: { onNotify: Notify }) {
  const [selected, setSelected] = useState<(typeof configurationSections)[number] | null>(null);
  const config: ModuleConfig = {
    description: "Administer security, workflows, scheme parameters and platform-wide preferences.",
    primary: "Invite user",
    metrics: [
      { label: "Platform users", value: "42", detail: "7 privileged users" },
      { label: "Roles", value: "12", detail: "Least privilege enforced", tone: "blue" },
      { label: "Pending approvals", value: "5", detail: "Configuration changes", tone: "amber" },
      { label: "Audit events today", value: "1,284", detail: "No exceptions", tone: "green" },
    ], columns: [], rows: [], filters: [],
  };
  return <>
    <ModuleHeader title="Configuration" config={config} onNotify={onNotify} /><ModuleMetrics metrics={config.metrics} />
    <section className="configuration-grid">{configurationSections.map(item => <button className="config-card" key={item.name} onClick={() => setSelected(item)}><span><item.icon /></span><div><strong>{item.name}</strong><p>{item.detail}</p><small>{item.count}</small></div><ArrowRight /></button>)}</section>
    <section className="module-workbench audit-panel"><div className="section-title"><div><h2>Recent administrative activity</h2><p>All configuration changes are recorded in the immutable audit trail.</p></div><button>View audit log</button></div>
      <div className="audit-row"><span><UserCheck /></span><div><strong>International e-commerce policy updated</strong><small>Operations User · Maker-checker approved</small></div><time>18 min ago</time></div>
      <div className="audit-row"><span><KeyRound /></span><div><strong>HSM key rotation schedule approved</strong><small>Security Operations · Change CHG-2026-1842</small></div><time>2 hrs ago</time></div>
    </section>
    <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
      <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{selected?.name}</DialogTitle><DialogDescription>{selected?.detail}</DialogDescription></DialogHeader>
        <div className="settings-list"><label><span>Require maker-checker approval<small>Recommended for production operations</small></span><Switch defaultChecked /></label><label><span>Send operator notifications<small>Notify assigned teams about changes</small></span><Switch defaultChecked /></label><label><span>Enforce session timeout<small>Sign out inactive privileged users</small></span><Switch defaultChecked /></label></div>
        <Button onClick={() => { setSelected(null); onNotify("Configuration saved", "success"); }}>Save configuration</Button>
      </DialogContent>
    </Dialog>
  </>;
}

export function ModuleView({ module, onNotify }: { module: string; onNotify: Notify }) {
  if (module === "Rewards & Loyalty") return <RewardsModule onNotify={onNotify} />;
  if (module === "Gift Cards") return <GiftCardsModule onNotify={onNotify} />;
  if (module === "Employee Cards") return <EmployeeCardsModule onNotify={onNotify} />;
  if (module === "Expense Cards") return <ExpenseCardsModule onNotify={onNotify} />;
  if (module === "Wallet Cards") return <WalletCardsModule onNotify={onNotify} />;
  if (module === "Hybrid Cards") return <HybridCardsModule onNotify={onNotify} />;
  if (module === "Digital Cards") return <DigitalCardsModule onNotify={onNotify} />;
  if (module === "Funding Routing") return <FundingRoutingModule onNotify={onNotify} />;
  if (module === "Merchant Network") return <MerchantNetworkModule onNotify={onNotify} />;
  if (module === "Corporate Gifting") return <CorporateGiftingModule onNotify={onNotify} />;
  if (module === "Redemptions") return <RedemptionsModule onNotify={onNotify} />;
  if (module === "Fuel Cards") return <FuelCardsModule onNotify={onNotify} />;
  if (module === "Controls & Limits") return <ControlsModule onNotify={onNotify} />;
  if (module === "Fraud & Risk") return <FraudModule onNotify={onNotify} />;
  if (module === "Card Programs") return <ProgramsModule onNotify={onNotify} />;
  if (module === "Configuration") return <ConfigurationModule onNotify={onNotify} />;
  const config = modules[module];
  if (config) return <DataModule title={module} config={config} onNotify={onNotify} />;
  return <section className="module-empty"><Gauge /><h1>{module}</h1><p>This operational workspace is ready for its service integration.</p></section>;
}
