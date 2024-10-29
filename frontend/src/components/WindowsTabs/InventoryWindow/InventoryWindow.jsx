import InventoryItemInput from "./InventoryItemInput/InventoryItemInput";
import InventoryItemTable from "./InventoryItemTable/InventoryItemTable";
import { Paper } from "@mui/material";

function InventoryWindow() {
	return (
		<Paper>
			<InventoryItemTable />
			<InventoryItemInput />
		</Paper>
	);
}

export default InventoryWindow;
