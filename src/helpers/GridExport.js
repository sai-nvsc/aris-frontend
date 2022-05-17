import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export function CustomAppointmentGrid() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{ fileName: "appointment_" + Date.now() }}
      />
    </GridToolbarContainer>
  );
}

export function CustomBiteCaseGrid() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{ fileName: "bitecases_" + Date.now() }}
      />
    </GridToolbarContainer>
  );
}

export function CustomInventoryGrid() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{ fileName: "inventory_" + Date.now() }}
      />
    </GridToolbarContainer>
  );
}
