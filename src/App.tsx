import Form from "./components/Form";
import { AppProvider } from "./Context";
import PDFDocument from "./components/PDFDocument";

function App() {
  return (
    <AppProvider>
      <div className="bg-neutral-100 overflow-hidden relative h-screen">
        <div className="w-full h-full pr-[280px] ">
          <div className="overflow-auto w-full h-full p-6">
            <div className="w-full">
              <PDFDocument />
            </div>
          </div>

          <div className="absolute w-[280px] h-full bg-white top-0 right-0 ">
            <Form />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
