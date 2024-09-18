import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import ExtraChargeLineStatic from "./ExtraChargeLineStatic/ExtraChargeLineStatic";
import ExtraChargeLineEditting from "./ExtraChargeLineEditting/ExtraChargeLineEditting";
import { useSelector } from "react-redux";

const ExtraChargeTable = () => {
	const { extraChargeData, extraChargeStaticArr } = useSelector((state) => state.invoiceWindow);
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
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{extraChargeData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} style={{ textAlign: "center" }}>
									No Data Input
								</TableCell>
							</TableRow>
						) : (
							extraChargeData.map((row, index) =>
								extraChargeStaticArr[index] ? (
									<ExtraChargeLineStatic key={index} index={index} />
								) : (
									<ExtraChargeLineEditting key={index} index={index} />
								)
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ExtraChargeTable;
