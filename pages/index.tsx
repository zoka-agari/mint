import React, { useEffect, useState } from 'react';

import Hero from '@/sections/hero';
import Benefits from '@/sections/benefits';
import HowItWorks from '@/sections/how-it-works';
import Trust from '@/sections/trust';
import CTA from '@/sections/cta';
import Footer from '@/sections/footer';
import Navbar from '@/sections/navbar';
import { scrollToSection } from '@/lib/helpers';
import MintSupplyGraph from '@/sections/graph';
import BackToTop from '@/components/back-to-top';
import FAQ from '@/sections/faq';
import ScarcityMechanics from '@/sections/scarcity';
import Tokenomics from '@/sections/tokenomics';

// Progress tracking hook
const useScrollProgress = () => {
    const [progress, setProgress] = useState({
        hero: true,
        benefits: false,
        howItWorks: false,
        trust: false,
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const path = params.get('p');
        if (path) {
            window.location.href = path;
        }
    }, []);

    useEffect(() => {
        const updateProgress = () => {
            const sections = {
                hero: document.getElementById('hero'),
                benefits: document.getElementById('benefits'),
                howItWorks: document.getElementById('how-it-works'),
                trust: document.getElementById('trust'),
            };

            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY + viewportHeight * 0.3;

            setProgress({
                hero: scrollPosition < (sections.benefits?.offsetTop || 0),
                benefits:
                    scrollPosition >= (sections.benefits?.offsetTop || 0) &&
                    scrollPosition < (sections.howItWorks?.offsetTop || 0),
                howItWorks:
                    scrollPosition >= (sections.howItWorks?.offsetTop || 0) &&
                    scrollPosition < (sections.trust?.offsetTop || 0),
                trust: scrollPosition >= (sections.trust?.offsetTop || 0),
            });
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return progress;
};

const Home = () => {
    const scrollProgress = useScrollProgress();

    return (
        <div className="min-h-screen bg-white">
            {/* Sticky Navigation */}
            <Navbar
                progress={scrollProgress}
                scrollToSection={scrollToSection}
            />

            {/* Hero Section */}
            <Hero />

            {/* Benefits Section */}
            <Benefits />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Tokenomics Works Section */}
            <Tokenomics />

            {/* Visual section */}
            <MintSupplyGraph />

            {/* Scarcity Mechanics Section */}
            <ScarcityMechanics />

            {/* Trust Section */}
            <Trust />

            {/* Final CTA */}
            <CTA />

            <FAQ />

            {/* Footer */}
            <Footer />

            {/* Back to Top Button */}
            <BackToTop />
        </div>
    );
};

export default Home;
