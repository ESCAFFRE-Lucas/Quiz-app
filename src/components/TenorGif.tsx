'use client';

import { useEffect } from 'react';

export default function TenorGif() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <style>{`
        .tenor-gif-embed iframe {
          pointer-events: none;
        }
        .tenor-gif-embed .tenor-share,
        .tenor-gif-embed .tenor-overlay {
          display: none !important;
        }
      `}</style>

            <div
                className="tenor-gif-embed"
                data-postid="8150170169450611599"
                data-share-method="host"
                data-aspect-ratio="1.08844"
                data-width="100%"
            >
                <a href="https://tenor.com/view/everknight-evernight-ever-night-hsr-star-rail-gif-8150170169450611599">
                    Everknight GIF
                </a>
            </div>
        </>
    );
}
