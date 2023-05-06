import "./App.css";
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

const printBarcode = async (serial: any) => {
  try {
    console.log("print barcode");
    // Create a new instance of the object
    const browserPrint = new ZebraBrowserPrintWrapper();
    console.log("browserprint >>> ", browserPrint);

    // Select default printer
    const defaultPrinter = await browserPrint.getDefaultPrinter();
    console.log("defaultPrinter >>> ", defaultPrinter);

    // Set the printer
    browserPrint.setPrinter(defaultPrinter);

    // Check printer status
    const printerStatus = await browserPrint.checkPrinterStatus();
    console.log("printerStatus >>> ", printerStatus);

    // Check if the printer is ready
    if (printerStatus.isReadyToPrint) {
      // ZPL script to print a simple barcode
      const zpl = `^XA
                      ^BY2,2,100
                      ^FO20,20^BC^FD${serial}^FS
                      ^XZ`;

      browserPrint.print(zpl);
    } else {
      console.log("Error/s", printerStatus.errors);
    }
  } catch (error: any) {
    console.log("error when print >>> ", error);
    throw new Error(error);
  }
};

function App() {
  const serial = "0123456789";

  return (
    <>
      <div>
        <button onClick={() => printBarcode(serial)}>Print Serial</button>
      </div>
    </>
  );
}

export default App;
