import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import PropTypes from "prop-types";

const ExtraChargeTable = () => {
	return (
		<Box sx={{ padding: 2 }}>
			<TableContainer component={Paper} sx={{ maxHeight: "500px", minWidth: "1000px", maxWidth: "100%", overflowX: "auto" }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Extra Charge Entry</TableCell>
							<TableCell>Count</TableCell>
							<TableCell>Charge</TableCell>
							<TableCell>Expense</TableCell>
							<TableCell>Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody></TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ExtraChargeTable;
