"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, Filter } from "lucide-react";

// ------- Type Definitions (inlined) -------
type FilterTab =
  | "All"
  | "Pre Sarfaesi"
  | "NPA"
  | "RSLI Responses"
  | "Symbolic Possession"
  | "DM Order"
  | "Physical Possession"
  | "Auction";

interface PortfolioItem {
  id: string;
  loanNo: string;
  loanType: string;
  borrower: string;
  borrowerAddress: string;
  coBorrowerName?: string;
  coBorrowerAddress?: string;
  currentDPD: number | string;
  sanctionAmount: string;
  stage?: string;
  status?: string;
  filterCategory: FilterTab;
}

// Dummy Data (replace this with actual data)
const portfolioData: PortfolioItem[] = [
    {
        id: "1",
        loanNo: "LN-123456",
        loanType: "Personal Loan",
        borrower: "John Smith",
        borrowerAddress: "78/90 Ben Davis Drive, San Francisco #70162",
        coBorrowerName: "Michelle Fox",
        coBorrowerAddress: "78 Main Street, Suite #12, San Francisco #70162",
        currentDPD: "120",
        sanctionAmount: "₹ 842,512",
        stage: "North",
        filterCategory: "Pre Sarfaesi",
      },
      {
        id: "2",
        loanNo: "LN-654321",
        loanType: "Home Loan",
        borrower: "Alice Johnson",
        borrowerAddress: "45 Elm Street, Los Angeles #90001",
        coBorrowerName: "Robert Johnson",
        coBorrowerAddress: "45 Elm Street, Los Angeles #90001",
        currentDPD: "60",
        sanctionAmount: "₹ 1,200,000",
        stage: "West",
        filterCategory: "NPA",
      },
      {
        id: "3",
        loanNo: "LN-789012",
        loanType: "Car Loan",
        borrower: "David Lee",
        borrowerAddress: "123 Pine Road, Chicago #60614",
        coBorrowerName: "Laura Lee",
        coBorrowerAddress: "123 Pine Road, Chicago #60614",
        currentDPD: "90",
        sanctionAmount: "₹ 650,000",
        stage: "East",
        filterCategory: "RSLI Responses",
      },
      {
        id: "4",
        loanNo: "LN-345678",
        loanType: "Education Loan",
        borrower: "Emma Brown",
        borrowerAddress: "56 Maple Street, Boston #02108",
        coBorrowerName: "Michael Brown",
        coBorrowerAddress: "56 Maple Street, Boston #02108",
        currentDPD: "30",
        sanctionAmount: "₹ 450,000",
        stage: "South",
        filterCategory: "Symbolic Possession",
      },
      {
        id: "5",
        loanNo: "LN-112233",
        loanType: "Gold Loan",
        borrower: "James Wilson",
        borrowerAddress: "789 Sunset Blvd, Miami #33101",
        coBorrowerName: "N/A",
        coBorrowerAddress: "N/A",
        currentDPD: "15",
        sanctionAmount: "₹ 300,000",
        stage: "Central",
        filterCategory: "DM Order",
      },
      {
        id: "6",
        loanNo: "LN-445566",
        loanType: "Business Loan",
        borrower: "Sophia Martinez",
        borrowerAddress: "22 Ocean Ave, San Diego #92101",
        coBorrowerName: "Carlos Martinez",
        coBorrowerAddress: "22 Ocean Ave, San Diego #92101",
        currentDPD: "180",
        sanctionAmount: "₹ 2,500,000",
        stage: "West",
        filterCategory: "Physical Possession",
      },
      {
        id: "7",
        loanNo: "LN-778899",
        loanType: "Mortgage Loan",
        borrower: "William Anderson",
        borrowerAddress: "10 Capitol Hill, Austin #73301",
        coBorrowerName: "Jessica Anderson",
        coBorrowerAddress: "10 Capitol Hill, Austin #73301",
        currentDPD: "0",
        sanctionAmount: "₹ 3,000,000",
        stage: "South",
        filterCategory: "Auction",
      },
      {
        id: "8",
        loanNo: "LN-998877",
        loanType: "Personal Loan",
        borrower: "Chloe Taylor",
        borrowerAddress: "95 Liberty Street, Seattle #98101",
        coBorrowerName: "Daniel Taylor",
        coBorrowerAddress: "95 Liberty Street, Seattle #98101",
        currentDPD: "45",
        sanctionAmount: "₹ 700,000",
        stage: "North",
        filterCategory: "Pre Sarfaesi",
      },
      {
        id: "9",
        loanNo: "LN-556677",
        loanType: "Education Loan",
        borrower: "Oliver Davis",
        borrowerAddress: "71 Riverfront Blvd, Denver #80202",
        coBorrowerName: "N/A",
        coBorrowerAddress: "N/A",
        currentDPD: "10",
        sanctionAmount: "₹ 520,000",
        stage: "East",
        filterCategory: "NPA",
      },
      {
        id: "10",
        loanNo: "LN-334455",
        loanType: "Car Loan",
        borrower: "Lily Moore",
        borrowerAddress: "88 Vine St, Portland #97209",
        coBorrowerName: "N/A",
        coBorrowerAddress: "N/A",
        currentDPD: "25",
        sanctionAmount: "₹ 480,000",
        stage: "West",
        filterCategory: "Symbolic Possession",
      },
];

// ------- Utility & Components -------
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = {
  default:
    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
  destructive:
    "bg-destructive text-white shadow-xs hover:bg-destructive/90",
  outline:
    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
  ghost:
    "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: keyof typeof buttonVariants;
  size?: "default" | "sm" | "md" | "icon";
}) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className
      )}
      {...props}
    />
  );
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition outline-none focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
}
import { PortfolioTable } from "../PortfolioTable/PortfolioTable";

// ------- Main Page -------
export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tabs: { value: FilterTab; label: string }[] = [
    { value: "All", label: "All" },
    { value: "Pre Sarfaesi", label: "Pre Sarfaesi" },
    { value: "NPA", label: "NPA" },
    { value: "RSLI Responses", label: "13(3) Responses" },
    { value: "Symbolic Possession", label: "Symbolic Possession" },
    { value: "DM Order", label: "DM Order" },
    { value: "Physical Possession", label: "Physical Possessions" },
    { value: "Auction", label: "Auctions" },
  ];

  const filteredData = useMemo(() => {
    let result =
      activeTab === "All"
        ? [...portfolioData]
        : portfolioData.filter((item) => item.filterCategory === activeTab);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.loanNo.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="md:pt-10 md:pl-68 md:pb-6 ml-4" >
      <h1 className="text-2xl font-bold mb-4 md:mx-0 mx-26">Portfolio</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <div><button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="sm:max-w-xs w-full">
          <Input
            type="text"
            placeholder="Search Loan Number"
            value={searchQuery}
            onChange={handleSearch}
            className="bg-white"
          />
        </div>
        <div className="flex gap-2 pr-2">
          <Button variant="outline" className="bg-white p-2">
            Select Columns
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="default" className="bg-blue-600 text-white px-2">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Selected count */}
      <div className="mb-2 text-sm text-black w-full px-4 py-2 flex items-baseline justify-between bg-white rounded-md shadow-sm">
        <button
          key={activeTab}
          disabled
          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white"
        >
          {activeTab}
        </button>
        {selectedRows.length} loans selected
      </div>

      {/* Table */}
      <PortfolioTable
        data={paginatedData}
        totalItems={filteredData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />
    </div>
  );
}
