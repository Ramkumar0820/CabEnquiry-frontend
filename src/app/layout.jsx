import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/template/header"
import Footer from "@/components/template/footer"
// import TawkProvider from "./providers/tawkMessenger/TawkProvider";

const inter = Poppins({ subsets: ["latin"], weight: ['100', '300', '700'], variable: '--poppins-font' });

export const metadata = {
  title: "Madurai SRM Tourism & Travels | Cab Booking, Airport Pickup & Outstation Trips",
  description:
    "Madurai SRM Tourism & Travels offers reliable cab booking, airport pickup and drop, and outstation travel services across Chennai and Tamil Nadu. Book safe, comfortable, and affordable rides with experienced drivers.",
};


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>
        {/* <TawkProvider /> */}
        <Header></Header>
        {children}
        <Footer></Footer>
      </Providers></body>
    </html>
  );
}
