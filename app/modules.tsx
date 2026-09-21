"use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Ban, BarChart3, Blocks, CheckCircle2,
  ChevronDown, CircleDollarSign, Clock3, CreditCard, Download, Eye, FileCheck2,
  FileText, Fingerprint, Gauge, KeyRound, LockKeyhole, MoreHorizontal, Network,
  Plus, RefreshCw, Search, Settings, ShieldAlert, ShieldCheck, SlidersHorizontal,
  Smartphone, Upload, UserCheck, UsersRound, WalletCards, Wifi, XCircle,
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
      { key: "limit", label: "Default daily limit" }, { key: "status", label: "Status" },
    ],
    rows: [
      { program: "Platinum Debit", type: "Debit · Retail", scheme: "Visa · 482100", cards: "8,421", limit: "PKR 250,000", status: "Live" },
      { program: "World Credit", type: "Credit · Retail", scheme: "Mastercard · 527600", cards: "3,108", limit: "PKR 500,000", status: "Live" },
      { program: "Business Expense", type: "Debit · Commercial", scheme: "Visa · 482160", cards: "4,912", limit: "PKR 1,000,000", status: "Live" },
      { program: "Youth Prepaid", type: "Prepaid · Retail", scheme: "Mastercard · 527640", cards: "2,842", limit: "PKR 50,000", status: "Live" },
      { program: "Green Virtual", type: "Virtual · Retail", scheme: "Visa · 482180", cards: "—", limit: "PKR 100,000", status: "Draft" },
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
  });
  const [binInput, setBinInput] = useState("");
  const [bins, setBins] = useState<string[]>([]);
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const validBinInput = /^\d{6,8}$/.test(binInput);
  const binExists = bins.includes(binInput);
  const validLimit = Number(form.dailyLimit) > 0;
  const addBin = () => {
    if (!validBinInput || binExists) return;
    setBins(current => [...current, binInput]);
    setBinInput("");
  };
  const createProgram = () => {
    const formattedLimit = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(form.dailyLimit));
    const newProgram: Row = {
      program: form.name.trim(),
      type: `${form.cardType} · ${form.segment}`,
      scheme: `${form.scheme} · ${bins.join(", ")}`,
      cards: "—",
      limit: `${form.currency} ${formattedLimit}`,
      status: "Draft",
    };
    setRows(current => [newProgram, ...current]);
    setOpen(false);
    setForm({ name: "", cardType: "Debit", segment: "Retail", scheme: "Visa", currency: "PKR", dailyLimit: "" });
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
        <label>Card type<select value={form.cardType} onChange={event => update("cardType", event.target.value)}><option>Debit</option><option>Credit</option><option>Prepaid</option><option>Virtual</option><option>Commercial</option></select></label>
        <label>Customer segment<select value={form.segment} onChange={event => update("segment", event.target.value)}><option>Retail</option><option>Priority</option><option>Youth</option><option>SME</option><option>Commercial</option></select></label>
        <label>Card scheme<select value={form.scheme} onChange={event => update("scheme", event.target.value)}><option>Visa</option><option>Mastercard</option><option>PayPak</option><option>UnionPay</option></select></label>
        <div className="bin-field"><label>BIN range</label><div className="bin-builder"><Input value={binInput} onChange={event => setBinInput(event.target.value.replace(/\D/g, "").slice(0, 8))} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addBin(); } }} placeholder="6–8 digits" inputMode="numeric" /><Button type="button" variant="outline" disabled={!validBinInput || binExists} onClick={addBin}><Plus />Add BIN</Button></div>{binInput && !validBinInput && <small>Enter a 6 to 8 digit BIN.</small>}{binExists && <small>This BIN is already assigned.</small>}</div>
        {bins.length > 0 && <div className="bin-list wide"><span>Assigned BINs</span><div>{bins.map(bin => <button type="button" className="bin-chip" key={bin} onClick={() => setBins(current => current.filter(item => item !== bin))}>{bin}<XCircle /></button>)}</div></div>}
        <label>Currency<select value={form.currency} onChange={event => update("currency", event.target.value)}><option>PKR</option><option>USD</option><option>EUR</option><option>GBP</option></select></label>
        <label>Default daily limit<Input type="number" min="1" value={form.dailyLimit} onChange={event => update("dailyLimit", event.target.value)} placeholder="e.g. 250000" /></label>
        <div className="rule-summary"><WalletCards /><div><strong>Maker-checker protected draft</strong><span>The program will be available for pricing, controls and eligibility configuration before approval and card issuance.</span></div></div>
        <footer><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!form.name.trim() || bins.length === 0 || !validLimit} onClick={createProgram}>Create as draft</Button></footer>
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
  if (module === "Controls & Limits") return <ControlsModule onNotify={onNotify} />;
  if (module === "Fraud & Risk") return <FraudModule onNotify={onNotify} />;
  if (module === "Card Programs") return <ProgramsModule onNotify={onNotify} />;
  if (module === "Configuration") return <ConfigurationModule onNotify={onNotify} />;
  const config = modules[module];
  if (config) return <DataModule title={module} config={config} onNotify={onNotify} />;
  return <section className="module-empty"><Gauge /><h1>{module}</h1><p>This operational workspace is ready for its service integration.</p></section>;
}
