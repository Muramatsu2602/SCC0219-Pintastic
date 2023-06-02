import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage' // do not forget to include the extension
import Cart from './pages/Cart'

function ShopRouter(props) {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/cart' element={<Cart />} />
		</Routes>
	)
}

export default ShopRouter