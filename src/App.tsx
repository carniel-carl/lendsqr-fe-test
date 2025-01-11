import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing/Routing";
import ScrollToTop from "./Routing/ScrollToTop";
import Context from "./store/context/Context";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <ScrollToTop>
          <Routing />
        </ScrollToTop>
      </Context>
    </BrowserRouter>
  );
}

export default App;
