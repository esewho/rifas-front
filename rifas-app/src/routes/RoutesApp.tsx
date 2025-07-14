import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Home from "../pages/Home"
import Raffles from "../pages/Raffles"

import Footer from "../pages/Footer"
import NavBar from "../pages/NavBar"
import RaffleDetail from "../components/RaffleDetail"

export default function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/raffles" element={<Raffles />} />
				<Route path="/raffles/:raffleId" element={<RaffleDetail />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/navbar" element={<NavBar />} />
			</Routes>
		</Router>
	)
}
