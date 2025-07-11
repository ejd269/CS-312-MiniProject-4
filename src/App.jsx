import { useState } from "react"
import "./App.css"
import Dashboard from "./Dashboard"
import Login from "./Login"

// app component
function App() {

  // page rendering that sets the indicated page as the useState
  const [pageRender, setPageRender] = useState("")

    // switch case for rendering the correct page
    switch (pageRender) {
      case "Dashboard":
        return <div id="main-container"><Dashboard updatePage={setPageRender} userId={1}></Dashboard></div>
        break;
      case "Login":
        return <div id="main-container"><Login updatePage={setPageRender}></Login></div>
        break;
      case "Signup":
        return <div id="main-container"><Signup updatePage={setPageRender}></Signup></div>
        break;
      // default behavior
      default:
        return <div id="main-container"><Login updatePage={setPageRender}></Login></div>
    }
}

export default App