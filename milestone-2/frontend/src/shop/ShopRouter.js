import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage' // do not forget to include the extension

function ShopRouter(props) {
	return (
		<Routes>
			<Route index element={<LandingPage />} />
		</Routes>
	)
}

export default ShopRouter
