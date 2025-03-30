"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Box,
    Typography,
    Pagination,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// --- Type definitions ---
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

interface PortfolioTableProps {
    data: PortfolioItem[];
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    selectedRows: string[];
    onSelectedRowsChange: (rows: string[]) => void;
}

export function PortfolioTable({
    data,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    selectedRows,
    onSelectedRowsChange,
}: PortfolioTableProps) {
    const toggleSelectAll = () => {
        if (selectedRows.length === data.length) {
            onSelectedRowsChange([]);
        } else {
            onSelectedRowsChange(data.map((item) => item.id));
        }
    };

    const toggleSelectRow = (id: string) => {
        if (selectedRows.includes(id)) {
            onSelectedRowsChange(selectedRows.filter((rowId) => rowId !== id));
        } else {
            onSelectedRowsChange([...selectedRows, id]);
        }
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const columns = [
        { key: "loanNo", header: "Loan No." },
        { key: "loanType", header: "Loan Type" },
        { key: "borrower", header: "Borrower" },
        { key: "borrowerAddress", header: "Borrower Address" },
        { key: "coBorrowerName", header: "Co Borrower 1 Name" },
        { key: "coBorrowerAddress", header: "Co Borrower 1 Address" },
        { key: "currentDPD", header: "Current DPD" },
        { key: "sanctionAmount", header: "Sanction Amount" },
        { key: "stage", header: "Region" },
        { key: "status", header: "Status" }, 
      ];

    return (
        <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <TableContainer >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={data.length > 0 && selectedRows.length === data.length}
                                    onChange={toggleSelectAll}
                                    inputProps={{ "aria-label": "select all rows" }}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    sx={{
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        color: "#374151",
                                    }}
                                >
                                    <Box display="flex" alignItems="center">
                                        {column.header}
                                        <Box ml={1} display="flex" flexDirection="column" height="100%">
                                            <ArrowDropUpIcon fontSize="small" sx={{ mt: -0.5 }} />
                                            <ArrowDropDownIcon fontSize="small" sx={{ mt: -1 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 4, color: "#6b7280" }}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => toggleSelectRow(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "#2563eb", fontWeight: 500 }}>{item.loanNo}</TableCell>
                                    <TableCell>{item.loanType}</TableCell>
                                    <TableCell>{item.borrower}</TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 200,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.borrowerAddress}
                                    </TableCell>
                                    <TableCell>{item.coBorrowerName || "-"}</TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 200,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.coBorrowerAddress || "-"}
                                    </TableCell>
                                    <TableCell>{item.currentDPD}</TableCell>
                                    <TableCell>{item.sanctionAmount}</TableCell>
                                    <TableCell>{item.stage || "-"}</TableCell>
                                    <TableCell>{item.status || "-"}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={2}
                borderTop="1px solid #e5e7eb"
            >
                <Typography variant="body2" color="text.secondary">
                    Total {totalItems} row(s).
                </Typography>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => onPageChange(page)}
                    color="primary"
                    size="small"
                />
            </Box>
        </Paper>
    );
}
