import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    Typography,
    Button,
    TextField,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UploadDocumentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UploadDrawer({ open, onOpenChange }: UploadDocumentProps) {
    const [file, setFile] = useState<File | null>(null);
    const [docName, setDocName] = useState('');
    const [docType, setDocType] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("File uploaded:", file);
        alert("File uploaded successfully!");
        onOpenChange(false);
        setFile(null);
        setDocName('');
        setDocType('');
        setRemarks('');
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => onOpenChange(false)}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 }, p: 3 },
            }}
        >
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h6">Upload Document</Typography>
                <IconButton onClick={() => onOpenChange(false)}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="doc-name-label">Document Name</InputLabel>
                    <Select
                        labelId="doc-name-label"
                        value={docName}
                        label="Document Name"
                        onChange={(e) => setDocName(e.target.value)}
                    >
                        <MenuItem value="invoice">Invoice</MenuItem>
                        <MenuItem value="receipt">Receipt</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="doc-type-label">Document Type</InputLabel>
                    <Select
                        labelId="doc-type-label"
                        value={docType}
                        label="Document Type"
                        onChange={(e) => setDocType(e.target.value)}
                    >
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="docx">DOCX</MenuItem>
                        <MenuItem value="xlsx">XLSX</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Document Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <div style={{ marginBottom: 16 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Select File
                    </Typography>
                    <label htmlFor="file-upload">
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <Button variant="outlined" component="span">
                            {file ? file.name : "Choose file"}
                        </Button>
                    </label>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "none" }}
                    >
                        Submit
                    </Button>
                </div>
            </form>

        </Drawer>
    );
}
