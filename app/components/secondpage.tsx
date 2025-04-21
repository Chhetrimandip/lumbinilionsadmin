import React from 'react'

const Secondpage = () => {
    return (    
        <div className="w-full min-h-screen relative overflow-hidden text-white px-4 py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src="buddha.jpg"
                    alt="Buddha Background"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                {/* Vignette effect (darker corners) */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60"></div>
                
                {/* Bottom shadow for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* Side decorative images */}
            <img
                className="hidden object-contain lg:block absolute top-[200px] overflow-hidden left-0 w-44 rotate-0 z-10"
                src="lionroar.png"
                alt=""
            />
            <img
                className="hidden lg:block object-contain absolute top-[200px] overflow-hidden right-0 w-44 rotate-0 z-10"
                src="lionroarinverted.png"
                alt=""
            />

            {/* Content container with proper z-index */}
            <div className="relative z-20">
                {/* Heading */}
                <h2 className="text-center text-3xl -mt-8 sm:text-5xl md:text-6xl font-['Bebas_Neue'] uppercase mb-16 text-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Our squad members
                </h2>

                {/* Squad cards */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Player 1 */}
                    <div className="relative w-60 h-96 hover:scale-110 transition-transform duration-400">
                        <img className="absolute top-8 w-full h-80" src="playercardexe.png" alt="" />
                    </div>

                    {/* Player 2 */}
                    <div className="relative w-60 h-96 scale-120 hover:scale-125 transition-transform duration-400">
                        <img className="absolute top-9 w-full h-80" src="middlecard.png" alt="" />
                    </div>

                    {/* Player 3 */}
                    <div className="relative w-60 h-96 hover:scale-110 transition-transform duration-400">
                        <img className="absolute top-8 w-full h-80" src="playercardexe.png" alt="" />
                    </div>
                </div>

                {/* Chairman Section */}
                <div className="mt-10 text-center">
                    <h3 className="text-2xl sm:text-4xl font-['Bebas_Neue'] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Word from our Chairman
                    </h3>
                    <div className="bg-black/50 backdrop-blur-sm p-6 -mt-2 rounded-lg max-w-4xl mx-auto">
                        <p className="text-amber-500 text-lg sm:text-xl font-['Bebas_Neue'] uppercase leading-8">
                            "Our strategy was clear from the beginning: to bring together a group of top-notch talents who
                            can represent the Lumbini Lions with pride, passion, and skill. I am confident that with the
                            dedication of our players and the support of our fans, we will lead this season and take home
                            the championship trophy. The Lions are ready to roar louder than ever before."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Secondpage;