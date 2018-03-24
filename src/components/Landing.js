import React from 'react';

const Landing = () => (
    <section className="landing">
        <h1 className="hero-title">Turn the music up!</h1>
        <section className="selling-points">
            <div class="point">
                <h2 class="point-title">Choose your music.</h2>
                <p class="point-description">
                    The world is full of music. Why should you have to listen to
                    music chosen by someone else?
                </p>
            </div>
            <div class="point">
                <h2 class="point-title">Unlimited, streaming, ad-free</h2>
                <p class="point-description">
                    No arbitrary limits. No distractions.
                </p>
            </div>
            <div class="point">
                <h2 class="point-title">Mobile enabled.</h2>
                <p class="point-description">
                    Listen to your music on the go. This streaming service is
                    available on all mobile platforms.
                </p>
            </div>
        </section>
    </section>
);

export default Landing;
