import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Modeling from './Modeling';
import Autication from './Autication';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App () {
    return(
        <BrowserRouter>
		<Routes>
			<Route path='/' element={<Login />}></Route>
			<Route path='/signup' element={<Signup />}></Route>
			<Route path='/modeling' element={<Modeling />}></Route>
			<Route path='/autication' element={<Autication />}></Route>
		</Routes>

		</BrowserRouter>
    )
}

export default App