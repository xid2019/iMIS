import { useState } from "react";
import { Box, Tab, Tabs, AppBar } from "@mui/material";
import POWindow from "./POWindow/POWindow";
import InvoiceWindow from "./InvoiceWindow/InvoiceWindow";

function WindowsTabs() {
	const [selectedTab, setSelectedTab] = useState(0);

	// Handle tab change
	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<Box sx={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
			{/* Fixed Tabs */}
			<AppBar position="fixed" sx={{ top: 0, zIndex: 1100, backgroundColor: "#F0F8FF" }}>
				<Tabs value={selectedTab} onChange={handleChange}>
					<Tab label="PO Entry" />
					<Tab label="Invoice" />
				</Tabs>
			</AppBar>

			{/* Add padding to content to avoid overlap with fixed tabs */}
			<Box sx={{ pt: 8 }}>
				{selectedTab === 0 && <POWindow />}
				{selectedTab === 1 && <InvoiceWindow />}
			</Box>
		</Box>
	);
}

export default WindowsTabs;
