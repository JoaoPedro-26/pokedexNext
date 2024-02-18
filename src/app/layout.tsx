import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Image from 'next/image'
import "./globals.css";
import Footer from "./footer/page";
import Link from "next/link";

const  roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teste Next",
  description: "Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='content'>
          <nav className='menu'>
            <section className='menuContent'>
              <Link href="/" className="flex items-center">
                <Image width={48} height={48} src='https://pngimg.com/d/pokemon_logo_PNG12.png' alt='logo'/>
                <h1 className="ml-2">Pokemon</h1>
              </Link>
            </section>
          </nav>
          {children}
        </main>
      </body>
      <Footer/>
    </html>
  );
}
