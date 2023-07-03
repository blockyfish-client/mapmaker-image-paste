import "./globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
	title: "Image to Deeeep.io Mapmaker",
	description: "Put an image on the Deeeep.io Mapmaker by plotting every pixel onto the map"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={quicksand.className}>{children}</body>
		</html>
	);
}
