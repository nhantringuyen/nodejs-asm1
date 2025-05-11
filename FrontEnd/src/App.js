import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import NavBar from './components/NavBar';  // Import NavBar


function App() {
	return (
		<BrowserRouter>
			<NavBar /> {/* Đặt NavBar ở đây để nó xuất hiện trên mọi trang */}
			<Routes>
			<Route path="/" element={<Browse/>}/>
			<Route path="/search" element={<Search/>}/>
		  </Routes>
		</BrowserRouter>
	  );
}

export default App;
