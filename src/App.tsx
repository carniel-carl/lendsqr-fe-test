import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing/Routing";
import ScrollToTop from "./Routing/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      {/* <ScrollToTop>
      </ScrollToTop> */}
      <Routing />
    </BrowserRouter>
  );
}

export default App;
