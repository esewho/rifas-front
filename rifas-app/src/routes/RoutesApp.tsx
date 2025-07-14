import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Home from "../pages/Home"
import Raffles from "../pages/Raffles"
import RaffleCard from "../pages/RaffleCard"
import Footer from "../pages/Footer"
import NavBar from "../pages/NavBar"

export default function RoutesApp() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/raffles" element={<Raffles />} />
				<Route path="/raffle/:id" element={<RaffleCard />} />
				<Route path="/footer" element={<Footer />} />
				<Route path="/navbar" element={<NavBar />} />
			</Routes>
		</Router>
	)
}
