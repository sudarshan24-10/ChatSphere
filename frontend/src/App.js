import SignIn from "./components/SignIn";
import {ToastContainer} from "react-toastify";
function App() {
  return (
    <div className="App">
      <SignIn></SignIn>
      <ToastContainer style={{color:"GrayText"}} position="bottom-center" className="toast" />
    </div>
  );
}

export default App;
