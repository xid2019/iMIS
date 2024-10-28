import { useState } from "react";
import { Box, Tab, Tabs, AppBar } from "@mui/material";
import POFilterWindow from "./POFilterWindow/POFilterWindow";
import POEntryWindow from "./POEntryWindow/POEntryWindow";
import InvoiceWindow from "./InvoiceWindow/InvoiceWindow";
import InventoryWindow from "./InventoryWindow/InventoryWindow";

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
					<Tab label="PO Filter" />
					<Tab label="PO Entry" />
					<Tab label="Invoice" />
					<Tab label="Inventory" />
				</Tabs>
			</AppBar>

			{/* Add padding to content to avoid overlap with fixed tabs */}
			<Box sx={{ pt: 8 }}>
				{selectedTab === 0 && <POFilterWindow />}
				{selectedTab === 1 && <POEntryWindow />}
				{selectedTab === 2 && <InvoiceWindow />}
				{selectedTab === 3 && <InventoryWindow />}
			</Box>
		</Box>
	);
}

export default WindowsTabs;
