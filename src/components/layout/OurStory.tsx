export const OurStory = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl mb-8 uppercase tracking-tighter">OUR STORY</h2>
            <div className="space-y-6 text-brand-silver/80 text-lg leading-relaxed">
              <p>
                INLINE4 wasn't built in a boardroom. It was born on the highway at 2 AM, inspired by the high-pitched scream of four cylinders hitting the redline.
              </p>
              <p>
                Founded by <span className="text-brand-red font-bold">Aditya Yadav</span> and co-founded by <span className="text-brand-red font-bold">Jay Dev</span>, our brand is a tribute to the riders who live for the adrenaline, the night runs, and the pure passion of sportbike culture.
              </p>
              <p>
                We don't just make clothes; we craft the identity for those who live at the limit. Every stitch is a testament to the raw energy of the ride. Built for riders. Made for the redline.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-red/20 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800" 
              alt="Sportbike Rider" 
              className="relative rounded-2xl border border-white/10 shadow-2xl brightness-75 grayscale-[20%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 -left-8 glass-card p-6 rounded-xl hidden md:block border border-white/10">
              <p className="redline-text text-brand-red text-xl uppercase tracking-widest">"Built Above Redline"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
