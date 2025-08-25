import { ShoppingCart, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black w-full py-10 text-white mt-19">
            <div className="max-w-6xl mx-auto px-5 grid grid-cols-1  md:grid-cols-3 gap-8 text-center md:text-left">

                <div>
                    <div className="flex justify-center md:justify-start items-center gap-2 mb-3">
                        <ShoppingCart size={36} className="text-yellow-400" />
                        <h1 className="text-3xl font-bold text-yellow-400">AMAZON</h1>
                    </div>
                    <p className="text-gray-300 text-sm">
                        We hope you enjoyed our shopping site.
                        Many more brands launching new products soon...
                    </p>
                </div>


                <div>
                    <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
                    <div className="flex justify-center md:justify-start gap-5">
                        <a href="" className="hover:text-yellow-400">
                            <Facebook size={28} />
                        </a>
                        <a href="" className="hover:text-yellow-400">
                            <Instagram size={28} />
                        </a>
                        <a href="" className="hover:text-yellow-400">
                            <Twitter size={28} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
                Copyright &copy; {new Date().getFullYear()} Amazon@gmail.com | All Rights Reserved
            </div>
        </footer>
    );
}
