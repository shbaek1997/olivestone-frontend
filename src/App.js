import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Upload } from "./pages/Upload";
import { Download } from "./pages/Download";
import { Files } from "./pages/Files";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
function App() {
  //default home = download page
  // use browser router to switch between pages
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Download></Download>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/upload" element={<Upload></Upload>}></Route>
          <Route path="/files" element={<Files></Files>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
