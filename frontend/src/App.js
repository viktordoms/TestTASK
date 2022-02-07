import {Routes} from "react-router";
import {Route} from "react-router-dom";
import Header from "./Components/Header";
import Users from "./Pages/Users";
import Groups from "./Pages/Groups";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    return (
        <div className="App">
            <Header/>
            <div>
                <Routes>
                    <Route exact path='/' element={<Users/>}/>
                    <Route exact path='/users/' element={<Users/>}/>
                    <Route path='/groups/' element={<Groups/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;