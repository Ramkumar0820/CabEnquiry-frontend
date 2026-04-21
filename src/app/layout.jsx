import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/template/header"
import Footer from "@/components/template/footer"

const inter = Poppins({ subsets: ["latin"], weight: ['100', '300', '700'], variable: '--poppins-font' });

export const metadata = {
  title: "Best Taxi & Travels in Madurai | Madurai SRM Tours & Travels",
  description: "Looking for reliable taxi services in Madurai? SRM Tours & Travels provides Madurai airport pickups, outstation cabs to Rameshwaram, Kodaikanal, and daily rental packages. Book your safe ride today!",
  // title: "Madurai SRM Tours & Travels | Cab Booking, Airport Pickup & Outstation Trips",
  // description:
  //   "Madurai SRM Tours & Travels offers reliable cab booking, airport pickup and drop, rental and outstation travel services across Madurai and Tamil Nadu. Book safe, comfortable, and affordable rides with experienced drivers.",
  verification: {
    google: "iBHkP0laoxJUkWDxDeHBoqt6-5GK0SU7pksLZBaa1nk",
  },
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
