import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

import "./App.css";
import ServerStatusWrapper from "./components/shared/ServerStatusWrapper";

function App() {
  return (
    <>
      <ServerStatusWrapper>
        <AppRouter />
        <Toaster position="bottom-center" />
      </ServerStatusWrapper>
    </>
  );
}

export default App;
