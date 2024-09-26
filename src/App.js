import { useNavigate } from "react-router-dom"


function App() {
  const navigate = useNavigate()

  return (
    <div className="app"> 
        <button onClick={() => navigate("/home")} className="button-colored">Entrer</button>
    </div>
  )
}

export default App
