export const TheRide = () => {
  return (
    <section id="ride" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-red/5 -skew-y-3 origin-left" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=600" 
                alt="Sportbike riders" 
                className="rounded-2xl w-full h-64 object-cover brightness-75 contrast-125"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=600" 
                alt="Night ride culture" 
                className="rounded-2xl w-full h-64 object-cover mt-8 brightness-50 contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="redline-text text-brand-red text-xl mb-4 block uppercase tracking-widest">More than clothing</span>
            <h2 className="text-5xl md:text-7xl mb-8">THE RIDE</h2>
            <p className="text-brand-silver/80 text-lg mb-8 leading-relaxed">
              INLINE4 is for those who live for the high RPM scream and the blur of the highway at night. We are a community of riders who push the limit. This is for those who ride.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Night Run Sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Performance Culture</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Rider Identity</span>
              </li>
            </ul>
            <button className="bg-white text-brand-dark px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all">
              Join the Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
