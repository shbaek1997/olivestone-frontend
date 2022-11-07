import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Upload } from "./pages/Upload";
import { Download } from "./pages/Download";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload></Upload>}></Route>
          <Route path="/download" element={<Download></Download>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
