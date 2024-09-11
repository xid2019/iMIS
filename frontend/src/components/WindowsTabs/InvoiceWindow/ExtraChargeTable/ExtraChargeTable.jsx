import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";
import PropTypes from "prop-types";
import ExtraChargeLineStatic from "./ExtraChargeLineStatic/ExtraChargeLineStatic";
import ExtraChargeLineEditting from "./ExtraChargeLineEditting/ExtraChargeLineEditting";

const ExtraChargeTable = ({ setData, extraChargeData, extraChargeTableStaticArr, setExtraChargeTableStaticArr }) => {
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
						{extraChargeData.map((row, index) =>
							extraChargeTableStaticArr[index] ? (
								<ExtraChargeLineStatic
									key={index}
									index={index}
									extraChargeData={extraChargeData}
									setData={setData}
									extraChargeTableStaticArr={extraChargeTableStaticArr}
									setExtraChargeTableStaticArr={setExtraChargeTableStaticArr}
								/>
							) : (
								<ExtraChargeLineEditting
									key={index}
									index={index}
									extraChargeData={extraChargeData}
									setData={setData}
									extraChargeTableStaticArr={extraChargeTableStaticArr}
									setExtraChargeTableStaticArr={setExtraChargeTableStaticArr}
								/>
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

ExtraChargeTable.propTypes = {
	setData: PropTypes.func.isRequired,
	extraChargeTableStaticArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
	setExtraChargeTableStaticArr: PropTypes.func.isRequired,
	extraChargeData: PropTypes.arrayOf(
		PropTypes.shape({
			extra_charge_entry: PropTypes.string,
			count: PropTypes.number,
			charge: PropTypes.number,
			expense: PropTypes.number,
		})
	).isRequired,
};

export default ExtraChargeTable;
