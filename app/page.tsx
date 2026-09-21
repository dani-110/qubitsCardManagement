"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3,
  Bell, Blocks, ChevronDown, CircleDollarSign, CreditCard, FileCheck2,
  Fingerprint, Gauge, KeyRound, LayoutDashboard, LockKeyhole,
  MoreHorizontal, Plus, RefreshCw, Search, Settings, ShieldCheck,
  SlidersHorizontal, Smartphone, Snowflake, Sparkles, UsersRound,
  WalletCards, Wifi, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModuleView } from "./modules";

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Cards", icon: CreditCard, count: "24.8k" },
  { label: "Customers", icon: UsersRound },
  { label: "Transactions", icon: Activity },
  { label: "Controls & Limits", icon: SlidersHorizontal },
  { label: "Fraud & Risk", icon: ShieldCheck, count: "12" },
  { label: "Disputes", icon: FileCheck2, count: "8" },
  { label: "Tokenization", icon: Smartphone },
  { label: "Card Programs", icon: WalletCards },
];

const platform = [
  { label: "Integrations", icon: Blocks },
  { label: "HSM & Keys", icon: KeyRound },
  { label: "Reports", icon: BarChart3 },
  { label: "Configuration", icon: Settings },
];

const cards = [
  { holder: "Ayesha Khan", initials: "AK", pan: "4821 •••• •••• 2847", program: "Platinum Debit", status: "Active", scheme: "VISA", bin: "482100", expiry: "08/30", customerId: "CUS-001842", account: "PK12 QBIT •••• 8831", kyc: "Verified", issued: "14 Aug 2025", balance: "PKR 284,500", last: "2 min ago", color: "#6c5ce7" },
  { holder: "Hamza Siddiqui", initials: "HS", pan: "5276 •••• •••• 9012", program: "World Credit", status: "Frozen", scheme: "MC", bin: "527600", expiry: "03/29", customerId: "CUS-003180", account: "PK18 QBIT •••• 2014", kyc: "Refresh due", issued: "09 Mar 2025", balance: "PKR 91,240", last: "18 min ago", color: "#159a88" },
  { holder: "Zoya Merchant", initials: "ZM", pan: "4821 •••• •••• 6219", program: "Business Expense", status: "Active", scheme: "VISA", bin: "482160", expiry: "11/31", customerId: "BUS-000924", account: "PK42 QBIT •••• 6118", kyc: "Verified", issued: "22 Nov 2025", balance: "PKR 1,482,000", last: "31 min ago", color: "#df7b3b" },
  { holder: "Ali Raza", initials: "AR", pan: "6275 •••• •••• 1140", program: "PayPak Debit", status: "Pending", scheme: "PayPak", bin: "627500", expiry: "09/31", customerId: "CUS-004122", account: "PK07 QBIT •••• 4093", kyc: "Verified", issued: "18 Sep 2026", balance: "PKR 48,900", last: "1 hr ago", color: "#3b82f6" },
  { holder: "Sara Ahmed", initials: "SA", pan: "5276 •••• •••• 4438", program: "Youth Prepaid", status: "Active", scheme: "MC", bin: "527640", expiry: "01/30", customerId: "CUS-004418", account: "PK55 QBIT •••• 1772", kyc: "Verified", issued: "06 Jan 2026", balance: "PKR 12,680", last: "2 hrs ago", color: "#bc5f96" },
];

const alerts = [
  { title: "Velocity threshold exceeded", detail: "Card •2847 · 6 transactions in 4 minutes", time: "2m", tone: "red" },
  { title: "Token provisioning approved", detail: "Apple Pay · Device ending C41A", time: "9m", tone: "green" },
  { title: "Chargeback response due", detail: "Case DSP-2026-00184 · PKR 42,500", time: "27m", tone: "amber" },
];
const bars = [42, 49, 46, 58, 54, 68, 64, 72, 67, 78, 74, 88];

function Status({ value }: { value: string }) {
  return <span className={`status status-${value.toLowerCase()}`}><i />{value}</span>;
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [globalQuery, setGlobalQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [issueCustomer, setIssueCustomer] = useState("");
  const [toast, setToast] = useState<{ message: string; tone: string } | null>(null);
  const [selected, setSelected] = useState(cards[0]);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [profileTab, setProfileTab] = useState<"overview" | "controls" | "activity">("overview");
  const [replacementPending, setReplacementPending] = useState(false);
  const [channelControls, setChannelControls] = useState({ contactless: true, ecommerce: true, international: false, atm: true });
  const [purchaseLimit, setPurchaseLimit] = useState("250000");
  const [atmLimit, setAtmLimit] = useState("100000");
  const [period, setPeriod] = useState("30 days");
  const filtered = useMemo(() => cards.filter((card) => `${card.holder} ${card.pan} ${card.program}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const searchResults = useMemo(() => [...nav, ...platform].filter(item => item.label.toLowerCase().includes(globalQuery.toLowerCase())).slice(0, 5), [globalQuery]);

  useEffect(() => {
    if (active !== "Overview") setInspectorOpen(false);
  }, [active]);

  const notify = (message: string, tone: "success" | "info" | "warning" = "info") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 2800);
  };

  const refreshDashboard = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      notify("Dashboard data refreshed", "success");
    }, 650);
  };

  const runGlobalSearch = (term = globalQuery) => {
    if (!term.trim()) return;
    const match = [...nav, ...platform].find(item => item.label.toLowerCase().includes(term.toLowerCase()));
    if (match) {
      setActive(match.label);
      setGlobalQuery("");
      notify(`Opened ${match.label}`, "info");
    } else {
      notify("No matching module found", "warning");
    }
  };

  const openCard = (card: typeof cards[number]) => {
    setSelected(card);
    setFrozen(card.status === "Frozen");
    setProfileTab("overview");
    setReplacementPending(false);
    setInspectorOpen(true);
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "16.5rem" } as React.CSSProperties}>
      <Sidebar collapsible="offcanvas" className="border-r-0 bg-[#08152b] text-white">
        <SidebarHeader className="px-5 pb-4 pt-6">
          <div className="brand-mark"><span>Q</span><div><strong>QUBITS</strong><small>CARD OS</small></div></div>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarGroup>
            <p className="nav-label">WORKSPACE</p>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={() => { setActive(item.label); setGlobalQuery(""); setInspectorOpen(false); }} isActive={active === item.label} tooltip={item.label} className="nav-item">
                    <item.icon /><span>{item.label}</span>{item.count && <b>{item.count}</b>}
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="pt-1">
            <p className="nav-label">PLATFORM</p>
            <SidebarGroupContent><SidebarMenu>
              {platform.map((item) => <SidebarMenuItem key={item.label}><SidebarMenuButton onClick={() => { setActive(item.label); setGlobalQuery(""); setInspectorOpen(false); }} isActive={active === item.label} className="nav-item"><item.icon /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>)}
            </SidebarMenu></SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="environment"><div><i /><span>Production</span></div><small>All systems operational</small></div>
          <div className="profile-mini"><div className="avatar">OU</div><div><strong>Operations User</strong><small>Authorized Operator</small></div><button onClick={() => notify("User menu opened", "info")} aria-label="User menu"><MoreHorizontal /></button></div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-[#f3f6fb]">
        <header className="topbar">
          <div className="topbar-left"><SidebarTrigger className="md:hidden" /><div className="crumb"><span>Card Management</span><b>/</b><strong>{active}</strong></div></div>
          <div className="topbar-actions">
            <div className="global-search"><Search /><input aria-label="Global search" value={globalQuery} onInput={event => setGlobalQuery(event.currentTarget.value)} onChange={event => setGlobalQuery(event.target.value)} onKeyDown={event => event.key === "Enter" && runGlobalSearch(event.currentTarget.value)} placeholder="Search modules and operations…" /><kbd>⌘ K</kbd>
              {globalQuery && <div className="search-results">{searchResults.length ? searchResults.map(item => <button key={item.label} onClick={() => { setActive(item.label); setGlobalQuery(""); }}><item.icon /><span>{item.label}</span><ArrowUpRight /></button>) : <span>No matching modules</span>}</div>}
            </div>
            <button className={`icon-button ${refreshing ? "spinning" : ""}`} aria-label="Refresh" onClick={refreshDashboard}><RefreshCw /></button>
            <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotificationsOpen(value => !value)}><Bell /><i /></button>
            <Dialog open={issueOpen} onOpenChange={setIssueOpen}><DialogTrigger asChild><Button className="new-card"><Plus />Issue card</Button></DialogTrigger>
              <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Issue a new card</DialogTitle><DialogDescription>Start a secure card-issuance workflow for a customer or business.</DialogDescription></DialogHeader>
                <div className="issue-grid"><label>Customer<Input value={issueCustomer} onChange={event => setIssueCustomer(event.target.value)} placeholder="Search customer or CNIC" /></label><label>Card program<select><option>Platinum Debit</option><option>Business Expense</option><option>Virtual Prepaid</option></select></label><label>Fulfilment<select><option>Instant virtual card</option><option>Branch pickup</option><option>Courier delivery</option></select></label><Button disabled={!issueCustomer.trim()} onClick={() => { setIssueOpen(false); setIssueCustomer(""); notify("Card issuance request created", "success"); }}>Create issuance request</Button></div>
              </DialogContent>
            </Dialog>
          </div>
          {notificationsOpen && <div className="notification-panel"><div><strong>Notifications</strong><button onClick={() => setNotificationsOpen(false)}><X /></button></div>{alerts.map(alert => <button key={alert.title} onClick={() => { setNotificationsOpen(false); setActive(alert.tone === "amber" ? "Disputes" : alert.tone === "red" ? "Fraud & Risk" : "Tokenization"); }}><span className={alert.tone} /><div><strong>{alert.title}</strong><small>{alert.detail}</small></div><time>{alert.time}</time></button>)}</div>}
        </header>

        <main className="dashboard">
          {active !== "Overview" ? <ModuleView module={active} onNotify={notify} /> : <>
          <section className="page-heading"><div><p className="eyebrow">SATURDAY, 19 SEPTEMBER</p><h1>{active === "Overview" ? "Portfolio overview" : active}</h1><p>Monitor card performance, risk and operations across all programs.</p></div><div className="heading-actions"><button onClick={() => notify("Base currency is PKR", "info")}><CircleDollarSign />PKR <ChevronDown /></button><button onClick={refreshDashboard}><Gauge />Live data</button></div></section>

          <section className="metrics">
            <article className="metric"><div className="metric-top"><span>Total cards</span><CreditCard /></div><strong>24,862</strong><footer><span className="up"><ArrowUpRight />8.2%</span><small>vs last month</small><div className="spark purple"><i /><i /><i /><i /><i /><i /></div></footer></article>
            <article className="metric"><div className="metric-top"><span>Active cards</span><Wifi /></div><strong>21,406</strong><footer><span className="up"><ArrowUpRight />5.4%</span><small>86.1% active</small><div className="spark teal"><i /><i /><i /><i /><i /><i /></div></footer></article>
            <article className="metric"><div className="metric-top"><span>Monthly volume</span><BarChart3 /></div><strong>PKR 3.84B</strong><footer><span className="up"><ArrowUpRight />12.7%</span><small>118.4k txns</small><div className="spark blue"><i /><i /><i /><i /><i /><i /></div></footer></article>
            <article className="metric"><div className="metric-top"><span>Risk exposure</span><ShieldCheck /></div><strong>0.18%</strong><footer><span className="down"><ArrowDownRight />0.04%</span><small>PKR 6.9M flagged</small><div className="spark orange"><i /><i /><i /><i /><i /><i /></div></footer></article>
          </section>

          <section className="content-grid">
            <article className="panel volume-panel">
              <div className="panel-head"><div><h2>Transaction volume</h2><p>Approved card spend across all channels</p></div><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></div>
              <div className="volume-total"><strong>PKR 3,842,690,500</strong><span><ArrowUpRight />12.7%</span></div>
              <div className="chart" aria-label={`Transaction chart for ${period}`}><div className="y-labels"><span>500M</span><span>375M</span><span>250M</span><span>125M</span><span>0</span></div><div className="bar-area">{bars.map((height, index) => <div className="bar-wrap" key={index}><i style={{ height: `${height}%` }} className={index === bars.length - 1 ? "latest" : ""} /><small>{["01","03","05","07","09","11","13","15","17","19","21","23"][index]}</small></div>)}</div></div>
              <div className="channel-row"><div><i className="pos" /><span>POS</span><strong>58.4%</strong></div><div><i className="ecom" /><span>E-commerce</span><strong>27.2%</strong></div><div><i className="atm" /><span>ATM</span><strong>14.4%</strong></div></div>
            </article>

            <article className="panel alert-panel">
              <div className="panel-head"><div><h2>Attention required</h2><p>Items that need an operator decision</p></div><button onClick={() => setActive("Fraud & Risk")}>View all</button></div>
              <div className="attention-counts"><div><strong>12</strong><span>Risk alerts</span></div><div><strong>8</strong><span>Disputes</span></div><div><strong>5</strong><span>Approvals</span></div></div>
              <div className="alert-list">{alerts.map((alert) => <button key={alert.title} className="alert-row" onClick={() => setActive(alert.tone === "amber" ? "Disputes" : alert.tone === "red" ? "Fraud & Risk" : "Tokenization")}><span className={`alert-icon ${alert.tone}`}>{alert.tone === "red" ? <AlertTriangle /> : alert.tone === "green" ? <ShieldCheck /> : <FileCheck2 />}</span><div><strong>{alert.title}</strong><small>{alert.detail}</small></div><time>{alert.time}</time></button>)}</div>
            </article>
          </section>

          <section className="panel cards-panel">
            <div className="panel-head cards-head"><div><h2>Card portfolio</h2><p>Recent cards and lifecycle activity</p></div><div className="card-filters"><div><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cards" /></div><button onClick={() => setActive("Cards")}><SlidersHorizontal />Filter</button><button className="more" onClick={() => setActive("Cards")} aria-label="Open all cards"><MoreHorizontal /></button></div></div>
            <div className="table-wrap"><table><thead><tr><th>Cardholder</th><th>Card & program</th><th>Status</th><th>Scheme</th><th>Available balance</th><th>Last activity</th><th /></tr></thead><tbody>
              {filtered.map((card) => <tr key={card.pan} onClick={() => openCard(card)}><td><div className="holder"><span style={{ background: `${card.color}18`, color: card.color }}>{card.initials}</span><div><strong>{card.holder}</strong><small>Retail customer</small></div></div></td><td><div className="card-cell"><strong>{card.pan}</strong><small>{card.program}</small></div></td><td><Status value={card.status} /></td><td><span className="scheme">{card.scheme}</span></td><td><strong>{card.balance}</strong></td><td><span className="last-dot" />{card.last}</td><td><button aria-label={`Open ${card.holder}`}><MoreHorizontal /></button></td></tr>)}
            </tbody></table></div>
            <footer className="table-footer"><span>Showing {filtered.length} of 24,862 cards</span><div><button disabled>Previous</button><button onClick={() => setActive("Cards")}>Next</button></div></footer>
          </section>

          <section className="capability-strip"><div><Fingerprint /><span><strong>PCI DSS 4.0</strong><small>Controls monitored</small></span></div><div><Smartphone /><span><strong>Network tokenization</strong><small>Apple Pay · Google Pay</small></span></div><div><LockKeyhole /><span><strong>3-D Secure 2.3</strong><small>Risk-based authentication</small></span></div><div><Sparkles /><span><strong>AI risk scoring</strong><small>Real-time decisions</small></span></div></section>
          </>}
        </main>

        {active === "Overview" && <aside className={`card-inspector ${inspectorOpen ? "open" : ""}`} aria-label="Card profile">
          <div className="inspector-head"><div><span>Card profile</span><strong>{selected.holder}</strong><small>{frozen ? "Frozen" : selected.status} · {selected.customerId}</small></div><button onClick={() => setInspectorOpen(false)} aria-label="Close card profile"><X /></button></div>
          <div className="digital-card" style={{ background: `linear-gradient(135deg, ${selected.color}, #0c1630)` }}><div className="dc-top"><span>QUBITS</span><Wifi /></div><div className="chip" /><strong>{selected.pan}</strong><div className="dc-bottom"><span>{selected.holder.toUpperCase()}</span><b>{selected.scheme}</b></div></div>
          <div className="quick-actions"><button onClick={() => { setFrozen(value => !value); notify(frozen ? "Card unfrozen" : "Card frozen", "success"); }} className={frozen ? "danger" : ""}><Snowflake /><span>{frozen ? "Unfreeze" : "Freeze"}</span></button><button onClick={() => setProfileTab("controls")}><SlidersHorizontal /><span>Manage limits</span></button><button disabled={replacementPending} onClick={() => { setReplacementPending(true); notify("Replacement request added to approval queue", "warning"); }}><LockKeyhole /><span>{replacementPending ? "Requested" : "Replace"}</span></button></div>
          <div className="profile-tabs"><button className={profileTab === "overview" ? "active" : ""} onClick={() => setProfileTab("overview")}>Overview</button><button className={profileTab === "controls" ? "active" : ""} onClick={() => setProfileTab("controls")}>Controls</button><button className={profileTab === "activity" ? "active" : ""} onClick={() => setProfileTab("activity")}>Activity</button></div>
          {profileTab === "overview" && <div className="profile-overview"><div><span>Card program</span><strong>{selected.program}</strong></div><div><span>BIN</span><strong>{selected.bin}</strong></div><div><span>Expiry</span><strong>{selected.expiry}</strong></div><div><span>Available balance</span><strong>{selected.balance}</strong></div><div><span>Linked account</span><strong>{selected.account}</strong></div><div><span>KYC status</span><strong>{selected.kyc}</strong></div><div><span>Issued on</span><strong>{selected.issued}</strong></div><div><span>Last activity</span><strong>{selected.last}</strong></div></div>}
          {profileTab === "controls" && <div className="profile-controls"><div className="inspector-section"><h3>Channel controls</h3>{([
            ["contactless", "Contactless payments"], ["ecommerce", "E-commerce"], ["international", "International usage"], ["atm", "ATM withdrawals"],
          ] as const).map(([key, label]) => <label key={key}><span>{label}</span><Switch checked={channelControls[key]} onCheckedChange={value => { setChannelControls(current => ({ ...current, [key]: value })); notify(`${label} ${value ? "enabled" : "disabled"}`, "success"); }} /></label>)}</div>
            <div className="inspector-section limit-editor"><h3>Spending limits</h3><label><span>Daily purchase limit<small>PKR</small></span><input type="number" min="1" value={purchaseLimit} onChange={event => setPurchaseLimit(event.target.value)} /></label><label><span>ATM daily limit<small>PKR</small></span><input type="number" min="1" value={atmLimit} onChange={event => setAtmLimit(event.target.value)} /></label><Button disabled={!purchaseLimit || !atmLimit} onClick={() => notify("Limit changes submitted for approval", "success")}>Submit limit changes</Button></div></div>}
          {profileTab === "activity" && <div className="profile-activity"><div className="activity-item"><span className="approved"><ArrowDownRight /></span><div><strong>Daraz PK</strong><small>Today, 14:42 · E-commerce</small></div><b>− PKR 18,450</b></div><div className="activity-item"><span className="approved"><ArrowDownRight /></span><div><strong>Careem</strong><small>Today, 12:18 · Token</small></div><b>− PKR 1,280</b></div><div className="activity-item"><span className="declined"><X /></span><div><strong>ATM UBL 0418</strong><small>Yesterday, 20:06 · Declined</small></div><b>PKR 50,000</b></div><Button variant="outline" onClick={() => { setActive("Transactions"); setInspectorOpen(false); }}>View all transactions</Button></div>}
        </aside>}
      </SidebarInset>
      {toast && <div className={`app-toast ${toast.tone}`} role="status"><ShieldCheck /><span>{toast.message}</span><button onClick={() => setToast(null)}><X /></button></div>}
    </SidebarProvider>
  );
}
