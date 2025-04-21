import React from 'react'

const Secondpage = () => {
    return (    
        <div className="w-full min-h-screen relative bg-black overflow-hidden text-white px-4 py-20">
        {/* Side decorative images */}
        <img
          className="hidden lg:block absolute top-[200px] left-0 w-44 rotate-0"
          src="lionroar.png"
          alt=""
        />
        <img
          className="hidden lg:block absolute top-[200px] right-0 w-44 rotate-0"
          src="lionroarinverted.png"
          alt=""
        />

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-['Bebas_Neue'] uppercase mb-16">
          Our squad members
        </h2>

        {/* Squad cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Player 1 */}
        <div className="relative w-60 h-96 hover:scale-110 transition-transform duration-400">
            <img className="absolute top-8 w-full h-80" src="playercardexe.png" alt="" />
        </div>

          {/* Player 2 */}
          <div className="relative w-60 h-96 hover:scale-110 transition-transform duration-400">
            <img className="absolute top-8 w-full h-80" src="middlecard.png" alt="" />
          </div>

          {/* Player 3 */}
          <div className="relative w-60 h-96 hover:scale-110 transition-transform duration-400">
            <img className="absolute top-8 w-full h-80" src="playercardexe.png" alt="" />
          </div>
        </div>

        {/* Chairman Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl sm:text-4xl font-['Bebas_Neue'] uppercase mb-4">
            Word from our Chairman
          </h3>
          <p className="max-w-4xl mx-auto text-amber-500 text-lg sm:text-xl font-['Bebas_Neue'] uppercase leading-8 px-4">
            “Our strategy was clear from the beginning: to bring together a group of top-notch talents who
            can represent the Lumbini Lions with pride, passion, and skill. I am confident that with the
            dedication of our players and the support of our fans, we will lead this season and take home
            the championship trophy. The Lions are ready to roar louder than ever before.”
          </p>
        </div>
      </div>
      );
}
 
export default Secondpage;